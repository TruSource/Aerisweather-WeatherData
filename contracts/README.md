## Example.sol

`Example.sol` implements `OracleAPI.sol` and demonstrates the usage of the WeatherData api.

Your implementation must meet the following:

1. Inherit `OracleAPI.sol`

```javascript
contract yourContract is OracleAPI { ... }
```

2. The constructor should accept a resolver address argument which is passed to the base contract using a **OracleAPI** modifier.

`constructor(address resolverAddress, ... ) OracleAPI (resolverAddress) public { ... }`

3. Implement `trusource_callback`

### Callback

Trusource will make callback calls to your contract.

```javascript
function trusource_callback(
        bytes32 queryId,
        Oracle.Oracle.Operations operationId,
        uint256 statusCode,
        string calldata result
    ) external checkAddress checkQueryId(queryId)
```

You can write conditional logic in `trusource_callback` based on the operationId and the status code.

```javascript
if (operationId == Oracle.Oracle.Operations.getAlerts) {
	if (statusCode == 200) {
		emit LogResult(queryId, operationId, statusCode, result);
		return;
	}
	return;
}
```

### Operation Ids

operationsIds are used to identify the operation, it is useful in the `trusource_callback` if multiple operations are used in your contract to differentiate between them.

| operationId | Operation     |
| ----------- | ------------- |
| 0  | getAlerts |
| 1  | getCountries |
| 2  | getForecasts |
| 3  | getLightningSummary |
| 4  | getObservations |
| 5  | getPhrasesSummary |
| 6  | getPlacesPostalcodes |
| 7  | getSunmoonMoonphases |
| 8  | getSunmoon |
