# OP_RETURN API

This is an experimental API to create proof-of-ownership using Bitcoin's `OP_RETURN` opcode.

## Routes

### Create New Proof

> ### Success Case
1. ✅ Receives a POST request in the **/api/address** route.
2. ✅ Creates a new transaction using the `address`.
3. ✅ Broadcasts a new transaction in the Bitcoin Testnet network
4. ✅ Returns 201 with the TxId of the transaction.

> ### Exceptions
1. ✅ Returns 404 error if the API doesn't exists.
2. ✅ Returns 400 error if address is not send by client.
3. ✅ Returns 500 error if something happens while interacting with Bitcoin network.
