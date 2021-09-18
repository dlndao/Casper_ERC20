use alloc::string::String;

use casper_types::{Key, U256};
use contract_utils::{ContractContext, ContractStorage};

use crate::data::{self, Allowances, Balances, Stakes};

pub trait ERC20<Storage: ContractStorage>: ContractContext<Storage> {
    fn init(&mut self, name: String, symbol: String, decimals: u8) {
        data::set_name(name);
        data::set_symbol(symbol);
        data::set_decimals(decimals);
        Balances::init();
        Stakes::init();
        Allowances::init();
    }

    fn balance_of(&mut self, owner: Key) -> U256 {
        Balances::instance().get(&owner)
    }

    fn stake_of(&mut self, owner: Key) -> U256 {
        Stakes::instance().get(&owner)
    }

    fn transfer(&mut self, recipient: Key, amount: U256) {
        self.make_transfer(self.get_caller(), recipient, amount);
    }

    fn approve(&mut self, spender: Key, amount: U256) {
        Allowances::instance().set(&self.get_caller(), &spender, amount);
    }

    fn allowance(&mut self, owner: Key, spender: Key) -> U256 {
        Allowances::instance().get(&owner, &spender)
    }

    fn transfer_from(&mut self, owner: Key, recipient: Key, amount: U256) {
        let allowances = Allowances::instance();
        let spender = self.get_caller();
        let spender_allowance = allowances.get(&owner, &spender);
        allowances.set(&owner, &spender, spender_allowance - amount);
        self.make_transfer(owner, recipient, amount);
    }

    fn mint(&mut self, recipient: Key, amount: U256) {
        let balances = Balances::instance();
        let balance = balances.get(&recipient);
        balances.set(&recipient, balance + amount);

        data::set_total_supply(data::total_supply() + amount);
    }

    fn add_stakeholder(&mut self, recipient: Key, amount: U256) {
        let stakes = Stakes::instance();
        let _stake = stakes.get(&recipient);
        stakes.set(&recipient, _stake + amount);
    }

    fn remove_stakeholder(&mut self, recipient: Key) {
        let stakes = Stakes::instance();
        stakes.remove(&recipient);
    }

    fn make_transfer(&mut self, sender: Key, recipient: Key, amount: U256) {
        let balances = Balances::instance();

        let sender_balance = balances.get(&sender);
        let recipient_balance = balances.get(&recipient);

        balances.set(&sender, sender_balance - amount);
        balances.set(&recipient, recipient_balance + amount);
    }

    fn total_supply(&mut self) -> U256 {
        data::total_supply()
    }
}