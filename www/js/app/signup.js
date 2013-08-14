/**
 * @module signup
 * Handles signup tasks such as:
 *
 *  - field validation
 *  - form aggregation & submission
 *
 * NOTE: sure, this could have been done with jQuery + Backbone's Model + validations;
 * however, rolling my own was much more fun for this excercise.
 */

define(function(require, exports, module) {
  'use strict';

  var domReady = require('./domReady');

  domReady(function() {
    var signup = document.getElementById('signup');

    /**
     * register form `submit` handler for processing signup submissions.
     */

    signup && signup.addEventListener('submit', process);

    /**
     * register form `input` handler for resetting form state.
     */

    signup && signup.addEventListener('input', reset);

    /**
     * register form `input` handler for resetting form state.
     */

    var alert = document.querySelector('[data-dismiss="alert"]');
    alert && alert.addEventListener('click', unalert);
  });

  /**
   * Whether form is valid for submission.
   *
   * @param {Event} event
   * DOM Level 2 event object.
   *
   * @return {Boolean}
   * whether form is valid for submission.
   */

  function validate(form, fields) {
    var errors  = [];
    var length  = fields.length || 0;
    var watched = {};
    var rule, value, id;

    /**
     * validation rule predicates
     */

    var rules = {
      test:      function (string, pattern) { return string && pattern && pattern.test && pattern.test(string); },
      match:     function (string, string2) { return string && string2 && string === string2; },
      minlength: function (string, length)  { return string && string.length; }
    };

    while (length--) {
      rule  = fields[length];
      id    = rule.id;
      value = form[id].value;

      if (rule.test && !rules.test(value, rule.test) && !watched[id]) {
        errors.push({ id: id, msg: rule.msg });
        watched[id] = true;
      }

      if (rule.match && !rules.match(value, form[rule.match].value) && !watched[id]) {
        errors.push({ id: id, msg: rule.msg });
        watched[id] = true;
      }

      if (rule.minlength && !rules.minlength(value, [rule.minlength]) && !watched[id]) {
        errors.push({ id: id, msg: rule.msg });
        watched[id] = true;
      }

      if (rule.required && !value && !watched[id]) {
        errors.push({ id: id, msg: id + ' is required.'});
        watched[id] = true;
      }
    }

    return errors;
  }

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

    request.open('POST', '/signup');
    request.send(keyvals);

    // if all goes well, login, otherwise, show the error message
    request.onload = function () {
      var response = JSON.parse(this.responseText);

      // show error message
      if (response.error) {
        return document.getElementById('error').classList.remove('is-hidden');
      }

      window.location.replace(response.location);
    };

    return request;
  }

  /**
   * decorate invalid form fields.
   *
   * @param {HTMLFormElement} form
   * form element to decorate.
   *
   * @param {Array} fields
   * form fields that should be decorated.
   */

  function decorate(form, fields) {
    fields.forEach(function (field) {
      var fieldId  = field.id;
      var element  = form[fieldId];
      var parent   = element.parentNode;

      // build message node
      var message = document.createElement('span');
      message.setAttribute('class', 'help-inline');
      message.appendChild(document.createTextNode(field.msg));

      // insert message node into DOM
      parent.insertBefore(message, element);

      // decorate control group
      parent.classList.add('error');
    });
  }

  /**
   * Validate and submit form.
   *
   * @param {
   *  - field validation
   *  - form aggregation & submission
   */

  function process(event) {
    event.preventDefault();

    // disable button
    document
      .querySelector('.login-actions > .btn-primary')
      .setAttribute('disabled', null);

    /**
     * define form fields and validation rules
     */

    var fields = [
      { id: 'email',            required: true, test: /\S+@\S+\.\S+/, msg: 'A validly formatted email address is required.' },
      { id: 'password',         required: true, minlength: 4,         msg: 'Password must be at least 4 characters in length.' },
      { id: 'password_confirm', required: true, match: 'password',    msg: 'Password and password confirmation must match.' }
    ];

    /**
     * decorate invalid fields or post form data
     */

    var errors = validate(this, fields);

    /**
     * decorate invalid fields or post form data
     */

    errors.length
      ? decorate(this, errors)
      : postform(this);

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
