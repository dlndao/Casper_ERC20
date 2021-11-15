use alloc::string::String;
// use alloc::vec::Vec;
use casper_types::{Key, U256};
use contract_utils::{ContractContext, ContractStorage};

// use crate::data::{self, Allowances, Balances, Proposals, Stakes};

use crate::{
    data::{self, Allowances, Backers, Balances, Proposals, Stakes},
    Backer, Error, Proposal, ProposalId,
};

pub trait ERC20<Storage: ContractStorage>: ContractContext<Storage> {
    fn init(&mut self, name: String, symbol: String, decimals: u8) {
        data::set_name(name);
        data::set_symbol(symbol);
        data::set_decimals(decimals);
        Balances::init();
        Stakes::init();
        Backers::init();
        Proposals::init();
        Allowances::init();
    }

    /// Returns the balance of `owner`.
    fn balance_of(&mut self, owner: Key) -> U256 {
        Balances::instance().get(&owner)
    }

    /// Returns the stakes amount of `owner`.
    fn stake_of(&mut self, owner: Key) -> U256 {
        Stakes::instance().get(&owner)
    }

    /// Returns the backs amount of `owner`.
    fn back_of(&mut self, proposal_id: ProposalId) -> Option<Backer> {
        Backers::instance().get(&proposal_id)
    }

    /// Returns the proposal details by proposal id.
    fn get_proposal(&mut self, proposal_id: ProposalId) -> Option<Proposal> {
        Proposals::instance().get(&proposal_id)
    }

    /// Transfers `amount` of tokens from the direct caller to `recipient`.
    fn transfer(&mut self, recipient: Key, amount: U256) -> Result<(), Error> {
        self.make_transfer(self.get_caller(), recipient, amount)
    }

    /// Allows `spender` to transfer up to `amount` of the direct caller's tokens.
    fn approve(&mut self, spender: Key, amount: U256) {
        Allowances::instance().set(&self.get_caller(), &spender, amount);
    }

    /// Returns the amount of `owner`'s tokens allowed to be spent by `spender`.
    fn allowance(&mut self, owner: Key, spender: Key) -> U256 {
        Allowances::instance().get(&owner, &spender)
    }

    /// Transfers `amount` of tokens from `owner` to `recipient` if the direct caller has been
    /// previously approved to spend the specified amount on behalf of the owner.
    fn transfer_from(&mut self, owner: Key, recipient: Key, amount: U256) -> Result<(), Error> {
        let allowances = Allowances::instance();
        let spender = self.get_caller();
        let spender_allowance = allowances.get(&owner, &spender);
        allowances.set(&owner, &spender, spender_allowance - amount);
        self.make_transfer(owner, recipient, amount)
    }

    /// Mints `amount` new tokens and adds them to `owner`'s balance and to the token total supply.
    fn mint(&mut self, recipient: Key, amount: U256) {
        let balances = Balances::instance();
        let balance = balances.get(&recipient);
        balances.set(&recipient, balance + amount);

        data::set_total_supply(data::total_supply() + amount);
    }

    /// Add stakeholder address to stake list
    fn add_stakeholder(&mut self, recipient: Key, amount: U256) {
        let stakes = Stakes::instance();
        let _stake = stakes.get(&recipient);
        stakes.set(&recipient, _stake + amount);
    }

    /// Add backer address to back list
    fn add_backer(&mut self, proposal_id: ProposalId, backers_map: Backer) {
        let backer_dict = Backers::instance();
        backer_dict.set(&proposal_id, backers_map.clone());
    }

    /// Add new proposal to proposals list by proposal id
    fn add_proposal(&mut self, proposal_id: ProposalId, proposals_map: Proposal) {
        let proposal_dict = Proposals::instance();
        proposal_dict.set(&proposal_id, proposals_map.clone());
    }

    /// remove stakeholder address from stake list
    fn remove_stakeholder(&mut self, recipient: Key) {
        let stakes = Stakes::instance();
        stakes.remove(&recipient);
    }

    /// remove backer address from back list
    fn remove_backer(&mut self, proposal_id: ProposalId) {
        let backers = Backers::instance();
        backers.remove(&proposal_id);
    }

    /// Transfers `amount` of tokens from the direct caller to `recipient`.
    fn make_transfer(&mut self, sender: Key, recipient: Key, amount: U256) -> Result<(), Error> {
        if sender == recipient || amount.is_zero() {
            return Ok(());
        }

        let balances = Balances::instance();

        let sender_balance = balances.get(&sender);
        let recipient_balance = balances.get(&recipient);

        balances.set(&sender, sender_balance - amount);
        balances.set(&recipient, recipient_balance + amount);
        Ok(())
    }

    /// Returns the total supply of the token.
    fn total_supply(&mut self) -> U256 {
        data::total_supply()
    }
}
