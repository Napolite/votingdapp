#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod voting {
    use super::*;

    pub fn initialise_poll(ctx:Context<InitialisePoll>, _poll_id:u64)->Result<()>{
      Ok(() )
    }
}

#[derive(Accounts)]
pub struct InitialisePoll<'info>{
 #[account(mut)]
 pub signer:Signer<'info>
}


