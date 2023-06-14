window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;
		const task_el = document.createElement('div');
		task_el.classList.add('task');
		const content = document.createElement('div');
		content.classList.add('content');
		task_el.appendChild(content);
		const Input = document.createElement('input');
		Input.classList.add('text');
		Input.type = 'text';
		Input.value = task;
		Input.setAttribute('readonly', 'readonly');

		content.appendChild(Input);

		const Actions = document.createElement('div');
		Actions.classList.add('actions');
		
		const EditButton = document.createElement('button');
		EditButton.classList.add('edit');
		EditButton.innerText = 'Edit';

		const DelButton = document.createElement('button');
		DelButton.classList.add('delete');
		DelButton.innerText = 'Delete';

        const MarkButton = document.createElement('button');
        MarkButton.classList.add('mark');
        MarkButton.innerText = 'Mark';

		const EmptyButton=document.getElementById('empty-button');

		Actions.appendChild(EditButton);
		Actions.appendChild(DelButton);
        Actions.appendChild(MarkButton);
		task_el.appendChild(Actions);
		list_el.appendChild(task_el);

		EditButton.addEventListener('click', (e) => {
			if (EditButton.innerText.toLowerCase()=="edit") {
				EditButton.innerText = "Save";
				Input.removeAttribute("readonly");
				Input.focus();
			} 
			else{
				EditButton.innerText="Edit";
				Input.setAttribute("readonly", "readonly");
			}
		});

		DelButton.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});

        MarkButton.addEventListener('click', (e) => {
			if(MarkButton.innerText.toLowerCase()=="mark"){
				MarkButton.innerText="Unmark";
				Input.style.textDecoration="line-through";
			}
			else{
				Input.style.textDecoration="none";
				MarkButton.innerText="Mark";
			}

        });

		EmptyButton.addEventListener('click', (e) => {
			list_el.innerHTML="";
		});
	});
});