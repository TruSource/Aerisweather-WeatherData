pragma solidity ^0.5.0;

import "./OracleAPI.sol";

/**
 * @title Example contract using WeatherData oracle
 * @author TruSource
 * @notice Example contract using WeatherData oracle
 * @dev Demonstrates usage of OracleAPI and building queryParams
 */
contract Example is OracleAPI {
    event LogResult(bytes32 queryId, Oracle.Oracle.Operations operationId, uint256 statusCode, string result);

    constructor(address resolverAddress) public OracleAPI(resolverAddress) {}

    /**
     * @notice Make getAlerts query
     * @dev Make getAlerts query, queryId is returned to be used to handle query result
     */
    function getAlerts() external {
        Buffer.buffer memory optionalQueryParams = createBuffer();
    
        // Optional
        addString(optionalQueryParams, "p", "55403");
    
        trusource_getAlerts("closest", optionalQueryParams);
    }

    /**
     * @notice Make getCountries query
     * @dev Make getCountries query, queryId is returned to be used to handle query result
     */
    function getCountries() external {
        trusource_getCountries("us");
    }

    /**
     * @notice Make getForecasts query
     * @dev Make getForecasts query, queryId is returned to be used to handle query result
     */
    function getForecasts() external {
        trusource_getForecasts("seattle,wa");
    }

    /**
     * @notice Make getLightningSummary query
     * @dev Make getLightningSummary query, queryId is returned to be used to handle query result
     */
    function getLightningSummary() external {
        trusource_getLightningSummary("atlanta,ga");
    }

    /**
     * @notice Make getObservations query
     * @dev Make getObservations query, queryId is returned to be used to handle query result
     */
    function getObservations() external {
        trusource_getObservations("55403");
    }

    /**
     * @notice Make getPhrasesSummary query
     * @dev Make getPhrasesSummary query, queryId is returned to be used to handle query result
     */
    function getPhrasesSummary() external {
        trusource_getPhrasesSummary("toronto,canada");
    }

    /**
     * @notice Make getPlacesPostalcodes query
     * @dev Make getPlacesPostalcodes query, queryId is returned to be used to handle query result
     */
    function getPlacesPostalcodes() external {
        trusource_getPlacesPostalcodes("55403");
    }

    /**
     * @notice Make getSunmoonMoonphases query
     * @dev Make getSunmoonMoonphases query, queryId is returned to be used to handle query result
     */
    function getSunmoonMoonphases() external {
        trusource_getSunmoonMoonphases("minneapolis,mn");
    }

    /**
     * @notice Make getSunmoon query
     * @dev Make getSunmoon query, queryId is returned to be used to handle query result
     */
    function getSunmoon() external {
        trusource_getSunmoon("minneapolis,mn");
    }

    /**
     * @dev Handle query result using queryId, operationId and statusCode
     * @param queryId unique id for query
     * @param operationId id for operation
     * @param statusCode HTTP response status code
     * @param result query result
     */
    function trusource_callback(
        bytes32 queryId,
        Oracle.Oracle.Operations operationId,
        uint256 statusCode,
        string calldata result
    ) external checkAddress checkQueryId(queryId) {
        if (operationId == Oracle.Oracle.Operations.getAlerts) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getCountries) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getForecasts) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getLightningSummary) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getObservations) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getPhrasesSummary) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getPlacesPostalcodes) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getSunmoonMoonphases) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getSunmoon) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }
    }
}
