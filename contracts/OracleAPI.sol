pragma solidity ^0.5.0;

import "@trusource/solidity-cbor/contracts/CBOR.sol";
import "./Resolver.sol" as Resolver;
import "./Oracle.sol" as Oracle;

/**
 * @title API for Oracle contract
 * @author TruSource
 * @dev API for Oracle contract
 */
contract OracleAPI {
    uint256 internal constant DEFAULT_BUFFER_SIZE = 256;
    using CBOR for Buffer.buffer;

    // keep track of queries that did not get a response yet
    mapping(bytes32 => bool) internal remainingQueries;

    Resolver.Resolver private resolver;
    Oracle.Oracle private oracle;
    address private owner;

    constructor(address resolverAddress) public {
        owner = msg.sender;
        resolver = Resolver.Resolver(resolverAddress);
        oracle = Oracle.Oracle(resolver.getOracleAddress());
    }

    modifier checkAddress() {
        require(
            msg.sender == callback_address(),
            "Only address that deployed the oracle can call this contract back"
        );
        _;
    }

    modifier checkQueryId(bytes32 queryId) {
        require(
            remainingQueries[queryId],
            "Id is not one of a remaining query (query never existed or already fulfilled)"
        );

        // remove query from list of unfulfilled queries
        remainingQueries[queryId] = false;

        _;
    }

    modifier setOracle {
        oracle = Oracle.Oracle(resolver.getOracleAddress());
        _;
    }

    /**
     * @dev get callback address
     * @return address Oracle owner address
     */
    function callback_address() internal view returns (address) {
        return oracle.getOwner();
    }

    /**
     * @dev getAlerts
     * @param action action path parameter
     * @return queryId unique id for query
     */
    function trusource_getAlerts(string memory action) internal returns (bytes32) {
        return trusource_getAlerts(action, "");
    }
    
    /**
     * @dev getAlerts
     * @param action action path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getAlerts(string memory action, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getAlerts(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getAlerts
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getAlerts(string memory action, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getAlerts(action, optionalQueryParams, "");
    }

    /**
     * @dev getAlerts
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getAlerts(string memory action, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getAlerts(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getCountries
     * @param action action path parameter
     * @return queryId unique id for query
     */
    function trusource_getCountries(string memory action) internal returns (bytes32) {
        return trusource_getCountries(action, "");
    }
    
    /**
     * @dev getCountries
     * @param action action path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getCountries(string memory action, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getCountries(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getCountries
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getCountries(string memory action, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getCountries(action, optionalQueryParams, "");
    }

    /**
     * @dev getCountries
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getCountries(string memory action, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getCountries(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getForecasts
     * @param action action path parameter
     * @return queryId unique id for query
     */
    function trusource_getForecasts(string memory action) internal returns (bytes32) {
        return trusource_getForecasts(action, "");
    }
    
    /**
     * @dev getForecasts
     * @param action action path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getForecasts(string memory action, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getForecasts(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getForecasts
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getForecasts(string memory action, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getForecasts(action, optionalQueryParams, "");
    }

    /**
     * @dev getForecasts
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getForecasts(string memory action, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getForecasts(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getLightningSummary
     * @param action action path parameter
     * @return queryId unique id for query
     */
    function trusource_getLightningSummary(string memory action) internal returns (bytes32) {
        return trusource_getLightningSummary(action, "");
    }
    
    /**
     * @dev getLightningSummary
     * @param action action path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getLightningSummary(string memory action, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getLightningSummary(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getLightningSummary
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getLightningSummary(string memory action, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getLightningSummary(action, optionalQueryParams, "");
    }

    /**
     * @dev getLightningSummary
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getLightningSummary(string memory action, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getLightningSummary(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getObservations
     * @param action action path parameter
     * @return queryId unique id for query
     */
    function trusource_getObservations(string memory action) internal returns (bytes32) {
        return trusource_getObservations(action, "");
    }
    
    /**
     * @dev getObservations
     * @param action action path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getObservations(string memory action, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getObservations(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getObservations
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getObservations(string memory action, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getObservations(action, optionalQueryParams, "");
    }

    /**
     * @dev getObservations
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getObservations(string memory action, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getObservations(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getPhrasesSummary
     * @param action action path parameter
     * @return queryId unique id for query
     */
    function trusource_getPhrasesSummary(string memory action) internal returns (bytes32) {
        return trusource_getPhrasesSummary(action, "");
    }
    
    /**
     * @dev getPhrasesSummary
     * @param action action path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getPhrasesSummary(string memory action, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getPhrasesSummary(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getPhrasesSummary
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getPhrasesSummary(string memory action, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getPhrasesSummary(action, optionalQueryParams, "");
    }

    /**
     * @dev getPhrasesSummary
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getPhrasesSummary(string memory action, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getPhrasesSummary(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getPlacesPostalcodes
     * @param action action path parameter
     * @return queryId unique id for query
     */
    function trusource_getPlacesPostalcodes(string memory action) internal returns (bytes32) {
        return trusource_getPlacesPostalcodes(action, "");
    }
    
    /**
     * @dev getPlacesPostalcodes
     * @param action action path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getPlacesPostalcodes(string memory action, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getPlacesPostalcodes(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getPlacesPostalcodes
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getPlacesPostalcodes(string memory action, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getPlacesPostalcodes(action, optionalQueryParams, "");
    }

    /**
     * @dev getPlacesPostalcodes
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getPlacesPostalcodes(string memory action, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getPlacesPostalcodes(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getSunmoonMoonphases
     * @param action action path parameter
     * @return queryId unique id for query
     */
    function trusource_getSunmoonMoonphases(string memory action) internal returns (bytes32) {
        return trusource_getSunmoonMoonphases(action, "");
    }
    
    /**
     * @dev getSunmoonMoonphases
     * @param action action path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getSunmoonMoonphases(string memory action, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getSunmoonMoonphases(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getSunmoonMoonphases
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getSunmoonMoonphases(string memory action, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getSunmoonMoonphases(action, optionalQueryParams, "");
    }

    /**
     * @dev getSunmoonMoonphases
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getSunmoonMoonphases(string memory action, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getSunmoonMoonphases(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getSunmoon
     * @param action action path parameter
     * @return queryId unique id for query
     */
    function trusource_getSunmoon(string memory action) internal returns (bytes32) {
        return trusource_getSunmoon(action, "");
    }
    
    /**
     * @dev getSunmoon
     * @param action action path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getSunmoon(string memory action, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getSunmoon(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getSunmoon
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getSunmoon(string memory action, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getSunmoon(action, optionalQueryParams, "");
    }

    /**
     * @dev getSunmoon
     * @param action action path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getSunmoon(string memory action, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(action);
    
        bytes32 queryId = oracle.getSunmoon(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }


    /**
      * @dev trusource_callback abstract function
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
    ) external;

    /**
      * @dev initialises buffer
      * @return Buffer.buffer
      */
    function createBuffer() internal pure returns (Buffer.buffer memory) {
        Buffer.buffer memory buf;
        Buffer.init(buf, DEFAULT_BUFFER_SIZE);
        return buf;
    }
    
    /**
      * @dev Adds key value pair to buffer
      * @param params buffer that is added
      * @param key key value
      * @param value value
      */
    function addString(Buffer.buffer memory params, string memory key, string memory value) internal pure {
        params.encodeString(key);
        params.encodeString(value);
    }
    
    /**
      * @dev Adds key value pair to buffer
      * @param params buffer that is added
      * @param key key value
      * @param value value
      */
    function addUInt(Buffer.buffer memory params, string memory key, uint256 value) internal pure {
        params.encodeString(key);
        params.encodeUInt(value);
    }

    /**
      * @dev Parses string as a uint
      * @param str string representation of uint
      * @return parsedInt integer
      */
    function parseInt(string memory str) internal pure returns (uint256 parsedInt) {
        bytes memory bstr = bytes(str);
        uint256 mint = 0;
        bool decimals = false;
        for (uint256 i = 0; i < bstr.length; i++) {
            if (
                (uint256(uint8(bstr[i])) >= 48) &&
                (uint256(uint8(bstr[i])) <= 57)
            ) {
                if (decimals) {
                    break;
                }
                mint *= 10;
                mint += uint256(uint8(bstr[i])) - 48;
            } else if (uint256(uint8(bstr[i])) == 46) {
                decimals = true;
            }
        }
        return mint;
    }}
