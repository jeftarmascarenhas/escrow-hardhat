// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
    address public arbiter;
    address public beneficiary;
    address public depositor;

    bool public isApproved;

    error NotArtiber(address);
    error FailedSendEther();
    error CannotZeroAddress();

    event Approved(uint256);

    constructor(address _arbiter, address _beneficiary) payable {
        initialValidate(_arbiter, _beneficiary);

        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
    }

    function initialValidate(
        address _arbiter,
        address _beneficiary
    ) internal pure {
        if (_arbiter == address(0) || _beneficiary == address(0)) {
            revert CannotZeroAddress();
        }
    }

    function approve() external {
        if (msg.sender != arbiter) {
            revert NotArtiber(msg.sender);
        }

        uint256 balance = address(this).balance;
        (bool sent, ) = payable(beneficiary).call{value: balance}("");

        if (!sent) {
            revert FailedSendEther();
        }

        emit Approved(balance);
        isApproved = true;
    }
}
