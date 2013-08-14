/**
 * @module signin
 * Handles signin form aggregation & submission
 */

define(function(require, exports, module) {
  'use strict';

  var domReady = require('./domReady');

  domReady(function() {
    var signin = document.getElementById('signin');

    /**
     * register form `submit` handler for processing signin submissions.
     */

    signin && signin.addEventListener('submit', signin);

    /**
     * register form `input` handler for resetting form state.
     */

    signin && signin.addEventListener('input', reset);

    /**
     * register form `input` handler for resetting form state.
     */

    var alert = document.querySelector('[data-dismiss="alert"]');
    alert && alert.addEventListener('click', unalert);
  });

  /**
   * post form contents to server
   *
   * @param {HTMLFormElement} form
   * form element to decorate.
   *
   * @param {Array} fields
   * form fields to be posted.
   */

  function postform(form) {
    var keyvals = new FormData(form);
    var request = new XMLHttpRequest();

    request.open('POST', '/signin');
    request.send(keyvals);

    // if all goes well, login, otherwise, show the error message
    request.onload = function () {
      var response = JSON.parse(this.responseText);
      var element  = document.getElementById('error');

      // show error message
      if (response.error) {
        return element.classList.remove('is-hidden');
      }

      window.location.replace(response.location);
    };

    return request;
  }

  /**
   * signin
   *
   * @param {
   *  - field validation
   *  - form aggregation & submission
   */

  function signin(event) {
    event.preventDefault();

    // disable button
    document
      .querySelector('.login-actions > .btn-primary')
      .setAttribute('disabled', null);

    postform(this);

    return false;
  }

  /**
   * Element state reset.
   *
   * @param {Event} event
   * DOM Level 2 event object.
   */

  function reset(event) {
    // reset element
    var element = event.target;
    element.parentNode.classList.remove('error');

    // reset button
    var button = this.querySelector('.login-actions > .btn-primary');
    button.removeAttribute('disabled');

    // hide error message
    var message = document.getElementById('error');
    unalert.call(message);
  }

  /**
   * Hide alert component.
   *
   * @param {Event} event
   * DOM Level 2 event object.
   */

  function unalert(event) {
    // event triggered from child; hide parent
    if (event && event.target) {
      return event.target.parentNode.classList.add('is-hidden');
    }

    // otherwise; hide target
    this.classList.add('is-hidden');
  }

  /**
   * exports
   */

  exports.postform = postform;

});
