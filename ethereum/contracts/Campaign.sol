// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum,  string memory pName, string memory pAim, string memory imagePath, uint financialGoal) public {
        address newCampaign = address(new Campaign(minimum, msg.sender, pName,pAim, imagePath, financialGoal));
        deployedCampaigns.push(newCampaign);
    }

     function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
    
}

contract Campaign {
    address public manager;
    string public projectName;
    string public projectAim;
    string public imageURL;
    uint public financialAim;
    uint public minimumContribution;
    mapping(address => bool) public supporters;
    uint public supportersCount;
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    uint public numRequests;
    mapping (uint => Request) public requests;  

    constructor(uint minimum, address creator, string memory pName, string memory pAim, string memory imagePath, uint financialGoal) {
        manager = creator;
        minimumContribution = minimum;
        projectName = pName;
        projectAim = pAim;
        financialAim = financialGoal;
        imageURL = imagePath;
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
    
    function createRequest(string memory description, uint value, address payable recipient)
    public  restricted {
        Request storage r = requests[numRequests++];
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.complete = false;
        r.approvalCount = 0;

    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
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

    function getSummary() public view returns (
      uint, uint, uint, uint, address,  string memory,  string memory, uint
      ) {
        return (
          minimumContribution,
          address(this).balance,
          numRequests,
          supportersCount,
          manager,
          projectName,
          projectAim,
          financialAim
        );
    }
    
}