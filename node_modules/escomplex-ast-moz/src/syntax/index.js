/*jshint nomen:false */
/*globals require, exports, __dirname */

'use strict';


/**
 * Modules
 */

var fs = require('fs');

/**
 * Libs
 */

var syntaxModules = {
    ArrrayExpression: require('./ArrayExpression'),
    AssignmentExpression: require('./AssignmentExpression'),
    BinaryExpression: require('./BinaryExpression'),
    BlockStatement: require('./BlockStatement'),
    BreakStatement: require('./BreakStatement'),
    CallExpression: require('./CallExpression'),
    CatchClause: require('./CatchClause'),
    ConditionalExpression: require('./ConditionalExpression'),
    ContinueStatement: require('./ContinueStatement'),
    DoWhileStatement: require('./DoWhileStatement'),
    ExpressionStatement: require('./ExpressionStatement'),
    ForInStatement: require('./ForInStatement'),
    ForStatement: require('./ForStatement'),
    FunctionDeclaration: require('./FunctionDeclaration'),
    FunctionExpression: require('./FunctionExpression'),
    Identifier: require('./Identifier'),
    IfStatement: require('./IfStatement'),
    Literal: require('./Literal'),
    LogicalExpression: require('./LogicalExpression'),
    MemberExpression: require('./MemberExpression'),
    NewExpression: require('./NewExpression'),
    ObjectExpression: require('./ObjectExpression'),
    Property: require('./Property'),
    ReturnStatement: require('./ReturnStatement'),
    SequenceExpression: require('./SequenceExpression'),
    SwitchCase: require('./SwitchCase'),
    SwitchStatement: require('./SwitchStatement'),
    ThisExpression: require('./ThisExpression'),
    ThrowStatement: require('./ThrowStatement'),
    TryStatement: require('./TryStatement'),
    UnaryExpression: require('./UnaryExpression'),
    UpdateExpression: require('./UpdateExpression'),
    VariableExpression: require('./VariableDeclaration'),
    VariableDeclarator: require('./VariableDeclarator'),
    WhileStatment: require('./WhileStatement'),
    WithStatement: require('./WithStatement')
};

/**
 * Get Syntax
 */

exports.get = getSyntax;

function getSyntax (settings) {
    var syntax = {}, name;

    for (name in syntaxModules) {
        if (syntaxModules.hasOwnProperty(name)) {
            syntax[name] = syntaxModules[name].get(settings);
        }
    }

    return syntax;
}




