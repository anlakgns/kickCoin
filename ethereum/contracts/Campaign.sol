pragma solidity ^0.4.17;

contract CampaingFactory {
    address[] public deployedCampaings;
    
    function createCampaing(uint minimum) public {
        address newCampaing = new Campaing(minimum, msg.sender);
        deployedCampaings.push(newCampaing);
    }
    
    function getDeployedCampaings() public view returns (address[]) {
        return deployedCampaings;
        
    }
    
    
}

contract Campaing {
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public supporters;
    uint public supportersCount;
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    Request[] public requests;
    
    function Campaing(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        supporters[msg.sender] = true;
        supportersCount++;
    }
    
    function createRequest(string description, uint value, address recipient)
    public  restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage  request = requests[index];
        
        require(supporters[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
        
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (supportersCount/2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
    } 
    
    
    
    
}