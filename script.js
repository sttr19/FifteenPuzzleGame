let divWrapper = document.createElement('div');
divWrapper.className = 'wrapper';
document.body.prepend(divWrapper);

let divGemArea = document.createElement('div');
divGemArea.className = 'gem-area';
divWrapper.prepend(divGemArea);

let cells = document.createElement('div');
cells.className = 'cells';
divGemArea.prepend(cells);


let btnShuffle = document.createElement('button');
btnShuffle.className = 'shuffle-btn';
btnShuffle.innerText = 'Shuffle';
divWrapper.append(btnShuffle);

let btnResult = document.createElement('button');
btnResult.className = 'result-btn';
btnResult.innerText = 'Results';
btnShuffle.after(btnResult);

let timeText = document.createElement('p');
timeText.setAttribute('id', 'timer');
timeText.innerText = 'Time: 00:00';
divWrapper.append(timeText);

let minutes = 0;
let seconds = 0;
let m, s;
let timeInterval = null;
let bestResult;
let isSolvableValue;

let movesText = document.createElement('p');
movesText.setAttribute('id', 'moves');
movesText.innerText = 'Moves: 0';
divWrapper.append(movesText);

let countClicks = 0;

let wonText = document.createElement('h3');
wonText.setAttribute('id', 'won');
divWrapper.append(wonText);

let shiftAudio = new Audio('audio/mixkit-paper-slide-1530.wav');
let btnShufftedAudio = new Audio('audio/mixkit-glass-plate-slide-1527.wav');





let divModes = document.createElement('div');
divModes.className = 'modes';
divWrapper.prepend(divModes);



let divModesSound = document.createElement('div');
divModesSound.className = 'sound-modes';
divWrapper.prepend(divModesSound);

let isSoundText = document.createElement('p');
isSoundText.className = 'sound-text';
isSoundText.innerText = 'Turn sound ON or OFF?'
divModesSound.before(isSoundText);

for (let i = 0; i < 2; i++) {
	let ModesArray = ['On', 'Off'];
	let textP = document.createElement('h2');
	let radioBtn = document.createElement('input');
	radioBtn.setAttribute('type', 'radio');
	radioBtn.setAttribute('name', 'sound-mode');
	radioBtn.setAttribute('value', `${ModesArray[i]}`);
	if (radioBtn.value === "On") {
		radioBtn.setAttribute('checked', true);
	}
	textP.innerText = `${ModesArray[i]}`;
	textP.prepend(radioBtn);
	divModesSound.append(textP);
}

for (let i = 0; i < 6; i++) {
	let ModesArray = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];
	let textP = document.createElement('p');
	let radioBtn = document.createElement('input');
	radioBtn.setAttribute('type', 'radio');
	radioBtn.setAttribute('name', 'mode');
	radioBtn.setAttribute('value', `mode_${i+3}`);
	if (radioBtn.value === "mode_4") {
		radioBtn.setAttribute('checked', true);
	}
	textP.innerText = `${ModesArray[i]}`;
	textP.prepend(radioBtn);
	divModes.append(textP);
}

const RADIO_NODES = document.getElementsByName('mode');
const RADIO_NODES_SOUND = document.getElementsByName('sound-mode');

let cellNodes, matrix, cellNodesNumber, shuffledArray;


for (let i = 0; i < RADIO_NODES.length; i++) {

	RADIO_NODES[i].addEventListener('change', function (event) {
		let modeSelected = event.target.value;
		createPuzzleByMode(modeSelected);
	});
	if (RADIO_NODES[i].checked) {
		CreatePuzzleLand();
	}
	divGemArea.addEventListener('click', time);
}
let modeSoundSelected;

for (let i = 0; i < RADIO_NODES_SOUND.length; i++) {

	RADIO_NODES_SOUND[i].addEventListener('change', function (event) {
		modeSoundSelected = event.target.value;
	});
	if (RADIO_NODES_SOUND[i].checked) {
		modeSoundSelected = 'On';
	}
}





function CreatePuzzleLand() {
	cells.innerHTML = '';
	let arrVal = new Array(16).fill(0).map((item, index) => index + 1);
	for (let i = 0; i < arrVal.length; i++) {
		let cell = document.createElement('button');
		cell.className = 'cell-btn cell-btn_4';
		cell.innerText = arrVal[i];
		cells.append(cell);
	}
	cellNodes = Array.from(cells.querySelectorAll('.cell-btn_4'));
	cellNodesNumber = cellNodes.map(item => Number(item.innerText));
	let countCells = 16;
	cellNodes[countCells - 1].style.display = 'none';
	shuffledArray = shuffleArray(cellNodesNumber);
	isSolvableValue = isSolvable(shuffledArray);
	console.log(isSolvableValue);

	if (isSolvableValue === true) {
		matrix = getMatrix(shuffledArray);
		setPositionCell(matrix, cellNodes);
	} else {
		CreatePuzzleLand();
	}
	//return cellNodes;
}

function createPuzzleByMode(mode) {

	if (mode === 'mode_3') {
		timeUpdate();
		cells.innerHTML = '';
		let arrVal = new Array(9).fill(0).map((item, index) => index + 1);
		for (let i = 0; i < arrVal.length; i++) {
			let cell = document.createElement('button');
			cell.className = 'cell-btn cell-btn_3';
			cell.innerText = arrVal[i];
			cells.append(cell);
		}
		cellNodes = Array.from(cells.querySelectorAll('.cell-btn_3'));
		cellNodesNumber = cellNodes.map(item => Number(item.innerText));
		let countCells = 9;
		cellNodes[countCells - 1].style.display = 'none';
		shuffledArray = shuffleArray(cellNodesNumber);

		isSolvableValue = isSolvable(shuffledArray);
		console.log(isSolvableValue);

		if (isSolvableValue === true) {
			matrix = getMatrix(shuffledArray);
			setPositionCell(matrix, cellNodes);
		} else {
			createPuzzleByMode(mode);
		}
		//console.log(matrix);
	}


	if (mode === 'mode_4') {
		wonText.innerText = '';
		timeUpdate();
		cells.innerHTML = '';
		let arrVal = new Array(16).fill(0).map((item, index) => index + 1);
		for (let i = 0; i < arrVal.length; i++) {
			let cell = document.createElement('button');
			cell.className = 'cell-btn cell-btn_4';
			cell.innerText = arrVal[i];
			cells.append(cell);
		}
		cellNodes = Array.from(cells.querySelectorAll('.cell-btn_4'));
		cellNodesNumber = cellNodes.map(item => Number(item.innerText));
		let countCells = 16;
		cellNodes[countCells - 1].style.display = 'none';
		shuffledArray = shuffleArray(cellNodesNumber);
		isSolvableValue = isSolvable(shuffledArray);
		console.log(isSolvableValue);

		if (isSolvableValue === true) {
			matrix = getMatrix(shuffledArray);
			setPositionCell(matrix, cellNodes);
		} else {
			createPuzzleByMode(mode);
		}

		//console.log(matrix);
	}


	if (mode === 'mode_5') {
		wonText.innerText = '';
		timeUpdate();
		cells.innerHTML = '';
		let arrVal = new Array(25).fill(0).map((item, index) => index + 1);
		for (let i = 0; i < arrVal.length; i++) {
			let cell = document.createElement('button');
			cell.className = 'cell-btn cell-btn_5';
			cell.innerText = arrVal[i];
			cells.append(cell);
			//console.log(cell);
		}

		cellNodes = Array.from(cells.querySelectorAll('.cell-btn_5'));
		cellNodesNumber = cellNodes.map(item => Number(item.innerText));
		let countCells = 25;
		cellNodes[countCells - 1].style.display = 'none';
		shuffledArray = shuffleArray(cellNodesNumber);

		isSolvableValue = isSolvable(shuffledArray);
		console.log(isSolvableValue);

		if (isSolvableValue === true) {
			matrix = getMatrix(shuffledArray);
			setPositionCell(matrix, cellNodes);
		} else {
			createPuzzleByMode(mode);
		}

	}

	if (mode === 'mode_6') {
		wonText.innerText = '';
		timeUpdate();
		cells.innerHTML = '';
		let arrVal = new Array(36).fill(0).map((item, index) => index + 1);
		for (let i = 0; i < arrVal.length; i++) {
			let cell = document.createElement('button');
			cell.className = 'cell-btn cell-btn_6';
			cell.innerText = arrVal[i];
			cells.append(cell);
			//console.log(cell);
		}

		cellNodes = Array.from(cells.querySelectorAll('.cell-btn_6'));
		cellNodesNumber = cellNodes.map(item => Number(item.innerText));
		let countCells = 36;
		cellNodes[countCells - 1].style.display = 'none';
		shuffledArray = shuffleArray(cellNodesNumber);
		isSolvableValue = isSolvable(shuffledArray);
		console.log(isSolvableValue);

		if (isSolvableValue === true) {
			matrix = getMatrix(shuffledArray);
			setPositionCell(matrix, cellNodes);
		} else {
			createPuzzleByMode(mode);
		}

	}

	if (mode === 'mode_7') {
		wonText.innerText = '';
		timeUpdate();
		cells.innerHTML = '';
		let arrVal = new Array(49).fill(0).map((item, index) => index + 1);
		for (let i = 0; i < arrVal.length; i++) {
			let cell = document.createElement('button');
			cell.className = 'cell-btn cell-btn_7';
			cell.innerText = arrVal[i];
			cells.append(cell);
			//console.log(cell);
		}

		cellNodes = Array.from(cells.querySelectorAll('.cell-btn_7'));
		cellNodesNumber = cellNodes.map(item => Number(item.innerText));
		let countCells = 49;
		cellNodes[countCells - 1].style.display = 'none';
		shuffledArray = shuffleArray(cellNodesNumber);
		isSolvableValue = isSolvable(shuffledArray);
		console.log(isSolvableValue);

		if (isSolvableValue === true) {
			matrix = getMatrix(shuffledArray);
			setPositionCell(matrix, cellNodes);
		} else {
			createPuzzleByMode(mode);
		}
	}

	if (mode === 'mode_8') {
		wonText.innerText = '';
		timeUpdate();
		cells.innerHTML = '';
		let arrVal = new Array(64).fill(0).map((item, index) => index + 1);
		for (let i = 0; i < arrVal.length; i++) {
			let cell = document.createElement('button');
			cell.className = 'cell-btn cell-btn_8';
			cell.innerText = arrVal[i];
			cells.append(cell);
			//console.log(cell);
		}

		cellNodes = Array.from(cells.querySelectorAll('.cell-btn_8'));
		cellNodesNumber = cellNodes.map(item => Number(item.innerText));
		let countCells = 64;
		cellNodes[countCells - 1].style.display = 'none';
		shuffledArray = shuffleArray(cellNodesNumber);
		isSolvableValue = isSolvable(shuffledArray);
		console.log(isSolvableValue);

		if (isSolvableValue === true) {
			matrix = getMatrix(shuffledArray);
			setPositionCell(matrix, cellNodes);
		} else {
			createPuzzleByMode(mode);
		}
	}
	//return cellNodes;
}


divGemArea.addEventListener('click', (event) => {
	let btnCell = event.target.closest('button');
	if (!btnCell) {
		return;
	}
	if (modeSoundSelected === 'On') {
		shiftAudio.cloneNode().play();
	}

	countClicks += 1;
	movesText.innerText = 'Moves:' + countClicks;
	let btnCellNumber = Number(btnCell.innerText);
	let btnCellCoords = findCoordinatesByNumber(btnCellNumber, matrix);
	let blankCoords = findCoordinatesByNumber(cellNodes.length, matrix);
	let isValid = isValidForSwap(btnCellCoords, blankCoords);
	if (isValid) {
		swap(btnCellCoords, blankCoords, matrix, cellNodesNumber);
		setPositionCell(matrix, cellNodes);
	}

})

function shuffleByBtn() {
	if (modeSoundSelected === 'On') {
		btnShufftedAudio.cloneNode().play();
	}
	shuffledArray = shuffleArray(matrix.flat());
	isSolvableValue = isSolvable(shuffledArray);
	console.log(isSolvableValue);
	if (isSolvableValue === true) {
		matrix = getMatrix(shuffledArray);
		setPositionCell(matrix, cellNodes);
	} else {
		shuffleByBtn();
	}
	timeUpdate();
}

btnShuffle.addEventListener('click', shuffleByBtn);

const result = document.querySelector('.result-btn');

result.addEventListener('click', () => {
	if (localStorage.bestResult) {
		let arrayOfResult = JSON.parse(localStorage.getItem('bestResult')).sort();
		let message = 'Your best time:\n\n';
		for (let i = 0; i < arrayOfResult.length; i++) {
			if (i < 10) {
				message = message + `${i + 1} - ${arrayOfResult[i]}\n`
			}
		}
		alert(message)
	} else {
		alert('No results!');
	}
})









///////////HELPERS/////////////////

function time() {
	timeInterval = setInterval(showTime, 1000);
	divGemArea.removeEventListener('click', time);
};

function timeUpdate() {
	if (timeInterval !== null) {
		clearInterval(timeInterval)
	};
	reset();
	divGemArea.addEventListener('click', time);
}

function showTime() {
	seconds++;
	if (seconds >= 60) {
		minutes++;
		seconds = 0;
	}

	m = minutes < 10 ? "0" + minutes : minutes;
	s = seconds < 10 ? "0" + seconds : seconds;
	timeText.innerText = `Time: ${m} : ${s}`;
}

function reset() {
	minutes = 0;
	seconds = 0;
	timeText.innerText = 'Time: 00:00';
	countClicks = 0;
	movesText.innerText = 'Moves: 0';
}


function getMatrix(arr) {

	if (arr.length === 9) {
		matrix = [
			[],
			[],
			[]
		];
		let x = 0;
		let y = 0;
		for (let i = 0; i < arr.length; i++) {
			if (x >= 3) {
				y++;
				x = 0;
			}
			matrix[y][x] = arr[i];
			x++;
		}
		//return matrix;
	}

	if (arr.length === 16) {
		matrix = [
			[],
			[],
			[],
			[]
		];
		let x = 0;
		let y = 0;
		for (let i = 0; i < arr.length; i++) {
			if (x >= 4) {
				y++;
				x = 0;
			}
			matrix[y][x] = arr[i];
			x++;
		}
		//return matrix;
	}



	if (arr.length === 25) {
		matrix = [
			[],
			[],
			[],
			[],
			[]
		];
		let x = 0;
		let y = 0;
		for (let i = 0; i < arr.length; i++) {
			if (x >= 5) {
				y++;
				x = 0;
			}
			matrix[y][x] = arr[i];
			x++;
		}
		//return matrix;
	}

	if (arr.length === 36) {
		matrix = [
			[],
			[],
			[],
			[],
			[],
			[]
		];
		let x = 0;
		let y = 0;
		for (let i = 0; i < arr.length; i++) {
			if (x >= 6) {
				y++;
				x = 0;
			}
			matrix[y][x] = arr[i];
			x++;
		}
		//return matrix;
	}

	if (arr.length === 49) {
		matrix = [
			[],
			[],
			[],
			[],
			[],
			[],
			[]
		];
		let x = 0;
		let y = 0;
		for (let i = 0; i < arr.length; i++) {
			if (x >= 7) {
				y++;
				x = 0;
			}
			matrix[y][x] = arr[i];
			x++;
		}
		//return matrix;
	}

	if (arr.length === 64) {
		matrix = [
			[],
			[],
			[],
			[],
			[],
			[],
			[],
			[]
		];
		let x = 0;
		let y = 0;
		for (let i = 0; i < arr.length; i++) {
			if (x >= 8) {
				y++;
				x = 0;
			}
			matrix[y][x] = arr[i];
			x++;
		}
		//return matrix;
	}
	return matrix;
}

function setPositionCell(matrix, arr) {
	//console.log(cellNodes);
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			const value = matrix[y][x];
			const nodeCell = arr[value - 1];
			setCellMoveStyle(nodeCell, x, y);
		}
	}
}


function setCellMoveStyle(node, x, y) {
	const shiftCell = 100;
	node.style.transform = `translate3D(${x*shiftCell}%,${y*shiftCell}%,0)`;
}

function shuffleArray(arr) {
	return arr.map(value => ({
			value,
			sort: Math.random()
		}))
		.sort((a, b) => a.sort - b.sort)
		.map(({
			value
		}) => value);
}


function findCoordinatesByNumber(number, matrix) {
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] === number) {
				return {
					x,
					y
				};
			}
		}
	}
	return null;
}

function isValidForSwap(coords1, coords2) {
	const diffX = Math.abs(coords1.x - coords2.x);
	const diffY = Math.abs(coords1.y - coords2.y);
	return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y);
}

function swap(coords1, coords2, matrix, arr) {
	const coords1Number = matrix[coords1.y][coords1.x];
	matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
	matrix[coords2.y][coords2.x] = coords1Number;
	//console.log(arr);
	if (isWon(matrix, arr)) {
		//alert('YOU WIN!!!');
		clearInterval(timeInterval);
		wonText.innerText = `Hooray! You solved the puzzle in ${m}:${s} and ${countClicks} moves!`;
		//let currentTime=`${m}:${s}`;
		bestResult = JSON.parse(localStorage.getItem('bestResult')) || [];
		bestResult.push(`${m}:${s}`);
		let arrToJson = JSON.stringify(bestResult);
		localStorage.setItem('bestResult', arrToJson);

	} else {
		wonText.innerText = '';
	}
}

function isWon(matrix, arr) {
	const flatMatrix = matrix.flat();
	for (let i = 0; i < arr.length; i++) {
		if (flatMatrix[i] !== arr[i]) {
			return false;
		}
	}
	return true;
}

//////проверка на решаемость/////////////

function isSolvable(arr) {
	console.log(arr);
	let inversionWhithEmpty = 0;
	let inversionWhithoutEmpty = 0;
	let totalInversion;
	let emptyIndex = arr.findIndex(x => x === arr.length);
	console.log(emptyIndex);
	for (let i = 0; i < arr.length; i++) {
		if (i > 0) {
			for (let j = 0; j < i; j++) {
				arr[i] < arr[j] ? inversionWhithEmpty++ : inversionWhithEmpty = inversionWhithEmpty;
			}
		}
	}
	console.log(inversionWhithEmpty);
	for (let i = emptyIndex + 1; i < arr.length; i++) {
		inversionWhithoutEmpty++;
	}

	console.log(inversionWhithoutEmpty);
	totalInversion = inversionWhithEmpty - inversionWhithoutEmpty;
	console.log(totalInversion);

	if (arr.length % 2 != 0) {
		if (totalInversion % 2 != 0) {
			isSolvableValue = false;
		} else {
			isSolvableValue = true;
		}
	} else {
		let stringEmpty = arr.length - 1;
		let sum = totalInversion + stringEmpty;
		console.log(sum);
		if (sum % 2 != 0) {
			isSolvableValue = true;
		} else {
			isSolvableValue = false;
		}
	}
	return isSolvableValue;
}