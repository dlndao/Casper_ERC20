#![no_std]

extern crate alloc;

pub mod data;
mod erc20;

pub use erc20::ERC20;

use alloc::{collections::BTreeMap, string::String};
pub type ProposalId = String;
pub type Proposal = BTreeMap<String, String>;
pub type Backer = BTreeMap<String, String>;
