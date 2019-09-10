import nexmo from "./index";

/**
 * Provides access to the `members` resource.
 */
class Members {
  /**
   * The path to the `members` resource.
   */
  static get PATH() {
    return "/beta/conversations/{conversation_uuid}/members";
  }

  /**
   * Creates a new Members.
   *
   * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
   * @param {Object} options - additional options for the class.
   */
  constructor(creds, options) {
    this.creds = creds;
    this.options = options;

    this._nexmo = this.options.nexmoOverride || nexmo;
  }

  /**
   * Creates a member in a conversation.
   *
   * @param {string} [conversationId] - The unique identifier for the conversation
   * @param {Object} params - Parameters used when adding a member to the conversation. See https://ea.developer.nexmo.com/api/conversation#add-a-user-to-a-conversation for more information.
   * @param {function} callback - function to be called when the request completes.
   */
  create(conversationId, params, callback) {
    params = JSON.stringify(params);

    var config = {
      host: "api.nexmo.com",
      path: Members.PATH.replace("{conversation_uuid}", conversationId),
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.creds.generateJwt()}`
      }
    };
    this.options.httpClient.request(config, callback);
  }

  /**
   * Get an existing member.
   *
   * @param {string} [conversationId] - The unique identifier for the conversation
   * @param {string|object} query - The unique identifier for the member to retrieve
   *               or a set of filter parameters for the query. For more information
   *               see https://ea.developer.nexmo.com/api/conversation#retrieve-members-of-a-conversation
   * @param {function} callback - function to be called when the request completes.
   */
  get(conversationId, query, callback) {
    this._nexmo.getWithQuery(
      Members.PATH.replace("{conversation_uuid}", conversationId),
      query,
      this.creds,
      this.options,
      callback
    );
  }

  /**
   * Update an existing member.
   *
   * @param {string} conversationId - The unique identifier for the conversation to update the member in.
   * @param {string} memberId - The unique identifier for the member to update.
   * @param {Object} params - Parameters used when updating the member.
   * @param {function} callback - function to be called when the request completes.
   */
  update(conversationId, memberId, params, callback) {
    params = JSON.stringify(params);

    var config = {
      host: "api.nexmo.com",
      path: `${Members.PATH.replace(
        "{conversation_uuid}",
        conversationId
      )}/${memberId}`,
      method: "PUT",
      body: params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.creds.generateJwt()}`
      }
    };

    this.options.httpClient.request(config, callback);
  }

  /**
   * Deleta an existing member.
   *
   * @param {string} conversationId- The unique identifier for the conversation to delete the member from.
   * @param {string} memberId - The unique identifier for the member to delete.
   * @param {function} callback - function to be called when the request completes.
   */
  delete(conversationId, memberId, callback) {
    var config = {
      host: "api.nexmo.com",
      path: `${Members.PATH.replace(
        "{conversation_uuid}",
        conversationId
      )}/${memberId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.creds.generateJwt()}`
      }
    };

    this.options.httpClient.request(config, callback);
  }
}

export default Members;
