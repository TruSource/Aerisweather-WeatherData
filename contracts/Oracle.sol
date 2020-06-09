pragma solidity ^0.5.0;

/** 
 * @title Oracle.
 * @author TruSource
 * @notice WeatherData oracle contract
 */ 
contract Oracle {
    address private owner;

    enum Operations { getAlerts, getCountries, getForecasts, getLightningSummary, getObservations, getPhrasesSummary, getPlacesPostalcodes, getSunmoonMoonphases, getSunmoon }

    // number of requests is incremented for each request to generate unique id
    mapping (address => uint256) private numRequests;

    event Log(
        address sender,
        bytes32 queryId,
        Operations operationId,
        bytes pathParams,
        bytes queryParams,
        string options
    );

    constructor() public {
        owner = msg.sender;
    }

    /**
     * @return address owner address
     */
    function getOwner() external view returns (address) {
        return owner;
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getAlerts(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getAlerts, pathParams, queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getCountries(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getCountries, pathParams, queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getForecasts(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getForecasts, pathParams, queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getLightningSummary(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getLightningSummary, pathParams, queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getObservations(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getObservations, pathParams, queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getPhrasesSummary(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getPhrasesSummary, pathParams, queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getPlacesPostalcodes(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getPlacesPostalcodes, pathParams, queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getSunmoonMoonphases(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getSunmoonMoonphases, pathParams, queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getSunmoon(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getSunmoon, pathParams, queryParams, options);
    }

    /**
     * @param operationId operation id
     * @return bytes32 query id
     */
    function generateQueryId(Operations operationId) internal returns (bytes32) {
        // increment number requests
        numRequests[msg.sender]++;

        // create id from hash of contract address, requestor address, requestor address count, and operation id
        return keccak256(abi.encodePacked(this, msg.sender, numRequests[msg.sender], operationId));
    }

    /**
     * @param operationId operation id
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function makeRequest(
        Operations operationId,
        bytes memory pathParams,
        bytes memory queryParams,
        string memory options
    ) internal returns (bytes32) {
        bytes32 queryId = generateQueryId(operationId);
        emit Log(msg.sender, queryId, operationId, pathParams, queryParams, options);
        return queryId;
    }
}
