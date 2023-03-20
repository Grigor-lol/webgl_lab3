let canvas = document.getElementById("pedestal");
canvas.width = 800;
canvas.height = 800;

initWebGl(canvas);

let shaderProgram = initShaderProgram(gl, vsSource, fsSource);
gl.useProgram(shaderProgram);
initBuffersCube()

//  Set buffer data to attributes
let positionAttribLocationCube = enableVertexAttrib(
    shaderProgram,
    "vertPositions",
    3, 6, 0);
gl.enableVertexAttribArray(positionAttribLocationCube);

let colorAttribLocationCube = enableVertexAttrib(
    shaderProgram,
    "vertColor",
    3, 6, 3);
gl.enableVertexAttribArray(colorAttribLocationCube);

let matWorldLocationCube = gl.getUniformLocation(shaderProgram, "mWorld");
let matViewLocationCube = gl.getUniformLocation(shaderProgram, "mView");
let matProjLocationCube = gl.getUniformLocation(shaderProgram, "mProj");
let vecColors = gl.getUniformLocation(shaderProgram, "uColors");

let worldMatrixCube = new Float32Array(16);
let viewMatrixCube = new Float32Array(16);
let projMatrixCube = new Float32Array(16);
let uColorsCube = [0.0, 0.0, 0.0]

const radian = (degree) => {return degree * (Math.PI / 180);}

glMatrix.mat4.identity(worldMatrixCube)
glMatrix.mat4.lookAt(viewMatrixCube, [0, 0, -10], [0, 0, 0], [0, 1, 0]);
glMatrix.mat4.perspective(projMatrixCube, radian(45), canvas.width / canvas.height, 0.1, 1000.0);

gl.uniformMatrix4fv(matWorldLocationCube, false, worldMatrixCube);
gl.uniformMatrix4fv(matViewLocationCube, false, viewMatrixCube);
gl.uniformMatrix4fv(matProjLocationCube, false, projMatrixCube);
gl.uniform3fv(vecColors, uColorsCube)

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
let currentAngle = 0;
let currentAngleY = 0;

// Set pedestal not in center
const r = 1;
const startX = -0.5;
const startY = -1.7;
const startZ = -1;
let topCubeWMatx = new Float32Array(16);
let botCubeWMatx = new Float32Array(16);
let leftCubeWMatx = new Float32Array(16);
let rightCubeWMatx = new Float32Array(16);

let identitiyArray = new Float32Array(16);
let identityMatrix = glMatrix.mat4.identity(identitiyArray);

glMatrix.mat4.translate(topCubeWMatx, identityMatrix, [startX, r + startY, startZ]);
glMatrix.mat4.translate(botCubeWMatx, identityMatrix, [startX, startY, startZ]);
glMatrix.mat4.translate(leftCubeWMatx, identityMatrix, [r + startX, startY, startZ]);
glMatrix.mat4.translate(rightCubeWMatx, identityMatrix, [-r + startX, startY, startZ]);

document.addEventListener('keydown', (event) => {
    let key = event.key;
    let rotationAngle = 3
    switch (key){
        case "q":
            currentAngle -= rotationAngle;
            glMatrix.mat4.rotate(topCubeWMatx, topCubeWMatx, radian(-rotationAngle), [0, 1, 0]);
            glMatrix.mat4.rotate(botCubeWMatx, botCubeWMatx, radian(-rotationAngle), [0, 1, 0]);

            glMatrix.mat4.translate(leftCubeWMatx, identityMatrix, [r * Math.cos(radian(-currentAngle + currentAngleY)) + startX, startY, r * Math.sin(radian(-currentAngle + currentAngleY)) + startZ]);
            glMatrix.mat4.rotate(leftCubeWMatx, leftCubeWMatx, radian(currentAngle), [0, 1, 0]);

            glMatrix.mat4.translate(rightCubeWMatx, identityMatrix, [r * Math.cos(radian(180 - currentAngle + currentAngleY)) + startX, startY, r * Math.sin(radian(180 - currentAngle + currentAngleY)) + startZ]);
            glMatrix.mat4.rotate(rightCubeWMatx, rightCubeWMatx, radian(currentAngle), [0, 1, 0]);
            break;

        case "e":
            currentAngle += rotationAngle;
            glMatrix.mat4.rotate(topCubeWMatx, topCubeWMatx, radian(rotationAngle), [0, 1, 0]);
            glMatrix.mat4.rotate(botCubeWMatx, botCubeWMatx, radian(rotationAngle), [0, 1, 0]);

            glMatrix.mat4.translate(leftCubeWMatx, identityMatrix, [r * Math.cos(radian(-currentAngle + currentAngleY)) + startX, startY, r * Math.sin(radian(-currentAngle + currentAngleY)) + startZ]);
            glMatrix.mat4.rotate(leftCubeWMatx, leftCubeWMatx, radian(currentAngle), [0, 1, 0]);

            glMatrix.mat4.translate(rightCubeWMatx, identityMatrix, [r * Math.cos(radian(180 - currentAngle + currentAngleY)) + startX, startY, r * Math.sin(radian(180 - currentAngle + currentAngleY)) + startZ]);
            glMatrix.mat4.rotate(rightCubeWMatx, rightCubeWMatx, radian(currentAngle), [0, 1, 0]);
            break;


        case "a":
            currentAngle -= rotationAngle;
            currentAngleY -= rotationAngle;
            glMatrix.mat4.rotate(topCubeWMatx, topCubeWMatx, radian(-rotationAngle), [0, 1, 0]);
            glMatrix.mat4.rotate(botCubeWMatx, botCubeWMatx, radian(-rotationAngle), [0, 1, 0]);
            glMatrix.mat4.rotate(leftCubeWMatx, leftCubeWMatx, radian(-rotationAngle), [0, 1, 0]);
            glMatrix.mat4.rotate(rightCubeWMatx, rightCubeWMatx, radian(-rotationAngle), [0, 1, 0]);
            break;

        case "d":
            currentAngle += rotationAngle;
            currentAngleY += rotationAngle;
            glMatrix.mat4.rotate(topCubeWMatx, topCubeWMatx, radian(rotationAngle), [0, 1, 0]);
            glMatrix.mat4.rotate(botCubeWMatx, botCubeWMatx, radian(rotationAngle), [0, 1, 0]);
            glMatrix.mat4.rotate(leftCubeWMatx, leftCubeWMatx, radian(rotationAngle), [0, 1, 0]);
            glMatrix.mat4.rotate(rightCubeWMatx, rightCubeWMatx, radian(rotationAngle), [0, 1, 0]);
            break;

        case "z":
            glMatrix.mat4.rotate(viewMatrixCube, viewMatrixCube, radian(-rotationAngle), [0, 1, 0]);
            break;

        case "c" :
            glMatrix.mat4.rotate(viewMatrixCube, viewMatrixCube, radian(rotationAngle), [0, 1, 0]);
            break;
        default:
            break;
    }
}, false);

requestAnimationFrame(draw);