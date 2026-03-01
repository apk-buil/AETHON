'use strict';

const express = require('express');
const router = express.Router();

/**
 * @api {post} /api/terminal Execute Command
 * @apiName ExecuteCommand
 * @apiGroup Terminal
 *
 * @apiParam {String} command Command to execute.
 *
 * @apiSuccess {String} output The output of the executed command.
 * @apiSuccess {String} error The error message, if any.
 * @apiSuccess {Number} code The exit code of the command.
 */

router.post('/', (req, res) => {
    const { exec } = require('child_process');
    const command = req.body.command;

    exec(command, (error, stdout, stderr) => {
        res.json({
            output: stdout,
            error: stderr,
            code: error ? error.code : 0
        });
    });
});

module.exports = router;