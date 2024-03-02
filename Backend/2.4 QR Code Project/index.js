/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import 'qr-image';


// var qr = require('qr-image');
 
var qr_png = qr.image('I love QR!', { type: 'png' });
qr_png.pipe(require('fs').createWriteStream('i_love_qr.png'));
 
var png_string = qr.imageSync('I love QR!', { type: 'png' });