pragma solidity ^0.4.11;

import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract MonaLease is usingOraclize {
    
    struct Renter {
        address addr;
        string name;
        string email;
        uint256 weiHeld;
        uint256 leaseStartDate;
        uint256 lastPaymentDate;
        uint256 owesWei;
        bool inDefault;
        bool _assigned;
    }
    
    uint256 constant weiPerEther = 1000000000000000000;

    address contractOwner;
    string description;
    uint256 rentalInterval;
    uint256 rentalFiatAmount;
    uint256 durationOfLease;
    
    uint256 public lastEthPriceAsFiat = 47500; //Default value
    uint256 public lastWeiPerFiat;
    uint256 rentalAmountAsWei;

    mapping  (address => Renter) public renters;
    address[] public renterList;
    address[] rentersInDefault;
    
    
    event rentPaid(address renterAddress);
    event rentDefault(address renterAddress);
    
    event newLogEntry(string _description);
    event priceTick(uint256 price);
    
    

    //Note that the rental amount is in AUD cents, eg 100 AU dollars would be 10000.
    function MonaLease(string _description, uint256 _rentalInterval, uint256 _rentalFiatAmount, uint256 _durationOfLease) {
        OAR = OraclizeAddrResolverI(0x851eE0383d9F0c2efedDF0c6d17E768292B6DBBb);
        contractOwner = msg.sender;
        description = _description;
        rentalInterval = _rentalInterval;
        rentalFiatAmount = _rentalFiatAmount;
        durationOfLease = _durationOfLease;
    }

    //Add a new renter
    function signLease(string _name, string _email) {
        Renter memory _renter = Renter({
            addr: msg.sender,
            name: _name,
            email: _email,
            weiHeld: 0,
            leaseStartDate: now,
            lastPaymentDate: now,
            owesWei: 0,
            inDefault: false,
            _assigned: true
        });
        renters[_renter.addr] = _renter;
        renterList.push(_renter.addr);
        newLogEntry("Signed lease");
    }

    function isContractOwner(address _address) constant returns (bool) {
        return ( _address == contractOwner);
    }

    modifier onlyContractOwner() {
        if (!isContractOwner(msg.sender)) {
            revert();
        }
        _;
    }

    function getRenter(address _renterAddress) internal returns (Renter) {
        //assert(renterExists(_renterAddress));
        return renters[_renterAddress];
    }
    
    function renterExists(address _renterAddress) constant returns (bool) {
        return (renters[_renterAddress]._assigned);
    }
    
    //If renter is registered, deposit into balance
    function _depositForRenter(address _renterAddress, uint256 amount) internal {
        if (amount > 0 && renterExists(_renterAddress)) {
            renters[_renterAddress].weiHeld += msg.value;
        }
        else {
            newLogEntry("Accepted admin payment");
        }
    }

    //Add ETH to a renter's purse
    function deposit(address _renterAddress) payable {
        _depositForRenter(_renterAddress, msg.value);
    }
    
    //If ETH sent to this contract, attempt to deposit it for renter registered under the sender's address.
    function () payable {
        _depositForRenter(msg.sender, msg.value);
    }

    //Return amount due as AUD and ETH
    function getAmountDue(address _renterAddress) constant returns (uint256 fiatValue, uint256 weiValue) {
        newLogEntry("getAmountDue()");
        Renter memory renter = getRenter(_renterAddress);
        uint timeElapsed = now - renter.lastPaymentDate;
        uint intervalsElapsed = timeElapsed / rentalInterval;
        fiatValue = intervalsElapsed * rentalFiatAmount;
        weiValue = fiatToWei(fiatValue);
    }
    
    //If (and only if) rent is due, send it to the owner's account.
    function takeRent(address _renterAddress) returns (bool) {
        newLogEntry("takeRent()");
        Renter memory renter = getRenter(_renterAddress);
        var (dueFiat, dueWei) = getAmountDue(_renterAddress);
        if (dueWei > 0 && dueWei > renter.weiHeld) {
            renter.owesWei = dueWei;
            renter.inDefault = true;
            return false;
        }
        else {
            newLogEntry("Preparing to send rent to contract owner"); 
            renter.weiHeld -= dueWei;
            renter.inDefault = false;
            renter.lastPaymentDate = now;
            renter.owesWei = 0;
            newLogEntry("Sending rent to contract owner");
            contractOwner.send(dueWei);
            newLogEntry("Sent rent");
            
            return true;
        }       
    }
    
    function fiatToWei(uint256 fiatValue) constant returns (uint256 fiatAsWei) {
        fiatAsWei = (weiPerEther / lastEthPriceAsFiat) * fiatValue;
    }
    
    //See if any rent is due, and if so, pay it.
    function run() {
        newLogEntry("Run()");
        //For each renter, getAmountDue and pay it
        for(uint i = 0; i < renterList.length; i++) {
            if (takeRent(renterList[i])) {
                rentPaid(renterList[i]);  
            }
            else {
                rentDefault(renterList[i]); 
            }

        }
    }
    
    //Schedule a price query
    function update(bool firstRun) {
        newLogEntry("update()");
        
        uint delay;
        //if (oraclize.getPrice("URL") > this.balance) {
        //    newLogEntry("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        //} 
        //else {
            newLogEntry("Sending Oraclize query");
            if (firstRun) {
                delay = 0;
            }
            else {
                delay = 120; //2 mins //86400; //1 day
            }
            //oraclize_query(delay, "URL", "json(https://api.independentreserve.com/Public/GetMarketSummary?primaryCurrencyCode=eth&secondaryCurrencyCode=aud).DayAvgPrice");
        //}
    }
    
    function __callback(bytes32 myid, string result, bytes proof) {
        newLogEntry("Received callback from Oraclize!");
        //require(msg.sender != oraclize_cbAddress());
        lastEthPriceAsFiat = parseInt(result, 2);
        lastWeiPerFiat = weiPerEther / lastEthPriceAsFiat;
        priceTick(lastEthPriceAsFiat);
        
        run(); //Do a rent run
        
        update(false); //Now schedule a call 24 hours from now
    }

}
