pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Timecap {
    string company; //company name
    address payable companyAddr;
    mapping(string => timecap) employeeMap; //employeeNumber -- employeeData

    struct timecap {
        address payable walletAddr;
        bool isValid;
        uint hireDate;
        uint openDate;
        
        uint money;
        
        string ans1;
        string ans2;
        string ans3;
        string ans4;
        string ans5;
        string ans6;
    }
    
    //constructor of this contract
    constructor () public {
        companyAddr = msg.sender;
    }

    //set name of this contract's company
    function setName(string memory _company) public {
        company = _company;
    }
    
    //make new capsule for new employee
    function newCap(string memory _empNumber, uint _hireDate, uint _openDate, uint _money, string memory _ans1, string memory _ans2, string memory _ans3, string memory _ans4, string memory _ans5, string memory _ans6) public payable{
        require(isEmpExist(_empNumber)==false, "[ERROR] Check the employee number.\nIt already exists!");
        
        employeeMap[_empNumber] = timecap(msg.sender, true, _hireDate, _openDate, _money, _ans1, _ans2, _ans3, _ans4, _ans5, _ans6);
       //companyAddr.transfer(msg.value);
    }
    
    event OpenEvent(string ans1, string ans2, string ans3, string ans4, string ans5, string ans6);
    //open capsule after opendate, and send money to the owner
    function openCap(string memory _empNumber) public payable returns (string[] memory){
        require(isEmpExist(_empNumber)==true, "[ERROR] There's no capsule data of employee number.\nPlease check!");
        require(msg.sender == employeeMap[_empNumber].walletAddr, "[ERROR] Wrong wallet address!\nYou are not the owner.");
        require(block.timestamp >= employeeMap[_empNumber].openDate, "[ERROR] You can't open yet!");
        
        employeeMap[_empNumber].walletAddr.transfer(employeeMap[_empNumber].money);
        string[] memory arr = new string[](6);
        arr[0] = employeeMap[_empNumber].ans1;
        arr[1] = employeeMap[_empNumber].ans2;
        arr[2] = employeeMap[_empNumber].ans3;
        arr[3] = employeeMap[_empNumber].ans4;
        arr[4] = employeeMap[_empNumber].ans5;
        arr[5] = employeeMap[_empNumber].ans6;

        emit OpenEvent(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5]);
    }
    /*
    function openCap2(string memory _empNumber) public view returns (string memory){
        return employeeMap[_empNumber].ans2;
    }

    function openCap3(string memory _empNumber) public view returns (string memory){
        return employeeMap[_empNumber].ans2;
    }

    function openCap4(string memory _empNumber) public view returns (string memory){
        return employeeMap[_empNumber].ans2;
    }

    function openCap5(string memory _empNumber) public view returns (string memory){
        return employeeMap[_empNumber].ans2;
    }

    function openCap6(string memory _empNumber) public view returns (string memory){
        return employeeMap[_empNumber].ans2;
    }
    */
    
    //check if the employee already made the capsule
    function isEmpExist(string memory _empNumber) public view returns (bool){
        if(employeeMap[_empNumber].isValid){
            return true;
        }
        else return false;
    }
}