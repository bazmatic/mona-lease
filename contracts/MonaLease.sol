pragma solidity ^0.4.11;

contract MonaLease {
    
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

    uint256 public lastEthPriceAsFiat = 47500; //Default value
    uint256 public lastWeiPerFiat;
    uint256 rentalAmountAsWei;

    mapping  (address => Renter) public renters;
    address[] public renterList;
    address[] rentersInDefault;
    address oracle;
    
    event rentPaid(address renterAddress);
    event rentDefault(address renterAddress);
    
    event newLogEntry(string _description);

    //Note that the rental amount is in AUD cents, eg 100 AU dollars would be 10000.
    function MonaLease(string _description, uint256 _rentalInterval, uint256 _rentalFiatAmount, address _oracle) {
        contractOwner = msg.sender;
        description = _description;
        rentalInterval = _rentalInterval;
        rentalFiatAmount = _rentalFiatAmount;
        oracle = _oracle;
    }

    //Add a new renter
    function signLease(string _name, string _email) public {
        newLogEntry("Signing lease 1");
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
        newLogEntry("Signing lease 2");
        renters[_renter.addr] = _renter;
        newLogEntry("Signing lease 3");
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

    modifier onlyOracle() {
        if (msg.sender != oracle) {
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
    
    //Add ETH to a renter's purse
    function deposit(address _renterAddress) payable {
        _depositForRenter(_renterAddress, msg.value);
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
    
    //If ETH sent to this contract, attempt to deposit it for renter registered under the sender's address.
    function () payable {
        _depositForRenter(msg.sender, msg.value);
    }
    
    //See if any rent is due, and if so, pay it.
    function run() {
        newLogEntry("Run()");
        //For each renter, getAmountDue and pay it
        for(uint i = 0; i < renterList.length; i++) {
            takeRent(renterList[i]);
        }
    }

    //Return amount due as AUD and ETH
    function getAmountDue(address _renterAddress)  constant returns (uint256 fiatValue, uint256 weiValue) {
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
            rentDefault(renter.addr); 
            return false;
        }
        else {
            newLogEntry("Preparing to send rent to contract owner"); 
            renter.weiHeld -= dueWei;
            renter.inDefault = false;
            renter.lastPaymentDate = now;
            renter.owesWei = 0;
            if (dueWei > 0) {
                newLogEntry("Sending rent to contract owner");
                contractOwner.send(dueWei);
                newLogEntry("Sent rent");
                rentPaid(renter.addr); 
            }
            return true;
        }       
    }
    
    function fiatToWei(uint256 fiatValue) constant returns (uint256 fiatAsWei) {
        fiatAsWei = (weiPerEther / lastEthPriceAsFiat) * fiatValue;
    }

    function giveExchangeRateAdvice(uint256 exchangeRate) onlyOracle {
        newLogEntry("Received Oracle advice");
        lastEthPriceAsFiat = exchangeRate;
        lastWeiPerFiat = weiPerEther / lastEthPriceAsFiat;
        
        run(); //Do a rent run
    }
}
