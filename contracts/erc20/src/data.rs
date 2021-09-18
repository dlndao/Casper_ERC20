use alloc::string::String;

use casper_contract::unwrap_or_revert::UnwrapOrRevert;
use casper_types::{Key, U256};

use crate::{Backer, Proposal, ProposalId};
use contract_utils::{get_key, set_key, Dict};

pub const BALANCES_DICT: &str = "balances";
pub const STAKES_DICT: &str = "stakes";
pub const BACKERS_DICT: &str = "backers";
pub const PROPOSALS_DICT: &str = "proposals";
pub const ALLOWANCES_DICT: &str = "allowances";
pub const NAME: &str = "name";
pub const SYMBOL: &str = "symbol";
pub const DECIMALS: &str = "decimals";
pub const TOTAL_SUPPLY: &str = "total_supply";

pub struct Proposals {
    dict: Dict,
}

pub struct Balances {
    dict: Dict,
}

pub struct Stakes {
    dict: Dict,
}

pub struct Backers {
    dict: Dict,
}

pub struct Allowances {
    dict: Dict,
}

impl Balances {
    pub fn instance() -> Balances {
        Balances {
            dict: Dict::instance(BALANCES_DICT),
        }
    }

    pub fn init() {
        Dict::init(BALANCES_DICT)
    }

    pub fn get(&self, owner: &Key) -> U256 {
        self.dict.get_by_key(owner).unwrap_or_default()
    }

    pub fn set(&self, owner: &Key, value: U256) {
        self.dict.set_by_key(owner, value);
    }
}

impl Stakes {
    pub fn instance() -> Stakes {
        Stakes {
            dict: Dict::instance(STAKES_DICT),
        }
    }

    pub fn init() {
        Dict::init(STAKES_DICT)
    }

    pub fn get(&self, owner: &Key) -> U256 {
        self.dict.get_by_key(owner).unwrap_or_default()
    }

    pub fn set(&self, owner: &Key, value: U256) {
        self.dict.set_by_key(owner, value);
    }

    pub fn remove(&self, owner: &Key) {
        self.dict.remove_by_key::<()>(owner);
    }
}

impl Backers {
    pub fn instance() -> Backers {
        Backers {
            dict: Dict::instance(BACKERS_DICT),
        }
    }

    pub fn init() {
        Dict::init(BACKERS_DICT)
    }

    pub fn get(&self, key: &ProposalId) -> Option<Backer> {
        self.dict.get(key)
    }

    pub fn set(&self, key: &ProposalId, value: Backer) {
        self.dict.set(key, value);
    }

    pub fn remove(&self, key: &ProposalId) {
        self.dict.remove::<ProposalId>(key);
    }
}

impl Proposals {
    pub fn instance() -> Proposals {
        Proposals {
            dict: Dict::instance(PROPOSALS_DICT),
        }
    }

    pub fn init() {
        Dict::init(PROPOSALS_DICT)
    }

    pub fn get(&self, key: &ProposalId) -> Option<Proposal> {
        self.dict.get(key)
    }

    pub fn set(&self, key: &ProposalId, value: Proposal) {
        self.dict.set(key, value);
    }

    pub fn remove(&self, key: &ProposalId) {
        self.dict.remove::<ProposalId>(key);
    }
}

impl Allowances {
    pub fn instance() -> Allowances {
        Allowances {
            dict: Dict::instance(ALLOWANCES_DICT),
        }
    }

    pub fn init() {
        Dict::init(ALLOWANCES_DICT)
    }

    pub fn get(&self, owner: &Key, spender: &Key) -> U256 {
        self.dict.get_by_keys((owner, spender)).unwrap_or_default()
    }

    pub fn set(&self, owner: &Key, spender: &Key, value: U256) {
        self.dict.set_by_keys((owner, spender), value);
    }
}

pub fn name() -> String {
    get_key(NAME).unwrap_or_revert()
}

pub fn set_name(name: String) {
    set_key(NAME, name);
}

pub fn symbol() -> String {
    get_key(SYMBOL).unwrap_or_revert()
}

pub fn set_symbol(symbol: String) {
    set_key(SYMBOL, symbol);
}

pub fn decimals() -> u8 {
    get_key(DECIMALS).unwrap_or_revert()
}

pub fn set_decimals(decimals: u8) {
    set_key(DECIMALS, decimals);
}

pub fn total_supply() -> U256 {
    get_key(TOTAL_SUPPLY).unwrap_or_default()
}

pub fn set_total_supply(total_supply: U256) {
    set_key(TOTAL_SUPPLY, total_supply);
}
