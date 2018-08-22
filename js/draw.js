const CELL_SIZE = 20; // px
const _px = value => `${value}px`;

const _draw = container => maze => {
	const borders = ['top', 'left', 'right', 'bottom'];
	const black_border = '1px solid black';

	for (let i = 0; i < maze.length; ++i) {
		for (let j = 0; j < maze[i].length; ++j) {
			const div = document.createElement('div');
			Object.assign(
				div.style,
				{ minWidth: _px(CELL_SIZE), minHeight: _px(CELL_SIZE) },
				...maze[i][j]
					.map((has_path, ix) => !has_path && {
						[`border-${borders[ix]}`]: black_border
					})
					.filter(Boolean)
			);
			container.appendChild(div);
		}
	}
	
};

const _fill = (container, step = 255 / 10) => columns => (r, c) => {
	const element = container.children[r * columns + c];
	const color = element.style.backgroundColor || 'rgb(0, 255, 0)';

	const rgb = Array.of;
	const [_, green] = eval(color).map(v => Math.min(v - step, 255) | 0);

	element.style.backgroundColor = `rgb(${[0, green, 0].join(', ')})`;
};


const init_picasso = maze => {
	const container = document.getElementById('maze-container');
	const maxHeight = _px(CELL_SIZE * maze.length);
	const maxWidth = _px(CELL_SIZE * maze[0].length);
	Object.assign(container.style, { maxHeight, maxWidth });

	return {
		fill: _fill(container)(maze[0].length),
		draw: _draw(container)
	};
};

