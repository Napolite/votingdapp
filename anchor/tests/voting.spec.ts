import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Voting } from "../target/types/voting";
import { BankrunProvider, startAnchor } from "anchor-bankrun";

const IDL = require("../target/idl/voting.json");

describe("voting", () => {
  // Configure the   client to use the local cluster.

  it("Initialize Voting", async () => {
    const _publicKey = new PublicKey(
      "AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ"
    );
    const context = await startAnchor(
      "",
      [{ name: "voting", programId: _publicKey }],
      []
    );

    const provider = new BankrunProvider(context);

    const votingProgram = new Program<Voting>(IDL, provider);

    await votingProgram.methods
      .initialisePoll(
        new anchor.BN(1),
        "This is the start of something new",
        new anchor.BN(0),
        new anchor.BN(1730916636513)
      )
      .rpc();

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, "le", 8)],
      _publicKey
    );

    const poll = await votingProgram.account.poll.fetch(pollAddress);

    console.log(poll);

    expect(poll.pollId.toNumber()).toEqual(1);
    expect(poll.description).toBe("This is the start of something new");
  });
});
