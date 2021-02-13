import React from "react";
import shortid from "shortid";

//#region  GetData
const getMyData = () => {
	fetch("https://assets.breatheco.de/apis/fake/todos/user/jvm4Geeks")
		.then(response => response.json())
		.then(data => console.log(data));
};
getMyData();
//#endregion

//#region  insertData
const insertData = () => {
	fetch("https://assets.breatheco.de/apis/fake/todos/user/jvm4Geeks", {
		method: "post",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
		body: JSON.stringify([])
	})
		.then(res => res.json())
		.then(res => console.log(res));
};
/*insertData();*/
//#endregion

//#region  PUTData
const PUTdata = () => {
	fetch("https://assets.breatheco.de/apis/fake/todos/user/jvm4Geeks", {
		method: "PUT",
		body: JSON.stringify([{ label: "arajo", done: false }]),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(resp => {
			console.log(resp.ok); // will be true if the response is successful
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp.text()); // will try return the exact result as string
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			//here is were your code should start after the fetch finishes
			console.log(data); //this will print on the console the exact object received from the server
		})
		.catch(error => {
			//error handling
			console.log(error);
		});
};
/*PUTData();*/
//#endregion

export function Home() {
	const [tarea, setTarea] = React.useState("");
	const [arrayTareas, setArrayTareas] = React.useState([]);
	const agregarTarea = e => {
		e.preventDefault();
		console.log(tarea);
		setArrayTareas([
			...arrayTareas,
			{
				id: shortid.generate(),
				nombreTarea: tarea
			}
		]);

		setTarea("");
	};

	const delArrayElement = id => {
		for (let i = 0; i < arrayTareas.length; i++) {
			if (arrayTareas[i].id === id) {
				arrayTareas.splice(i, 1);
				setArrayTareas([...arrayTareas]);
			}
		}
	};

	return (
		<div className="container">
			<h1 className="text-center">React TO-DO-List</h1>
			<div className="row">
				<div className="col-12">
					<h4 className="text-center">TODOS</h4>
					<ul className="list-group">
						<form onSubmit={agregarTarea}>
							<li className="list-group-item">
								<input
									type="text"
									className="form-control mb-2 rounded border border-dark"
									placeholder="Ingrese Tarea"
									onChange={e => setTarea(e.target.value)}
									value={tarea}
								/>
							</li>
						</form>

						{arrayTareas.map(item => (
							<li className="list-group-item" key={item.id}>
								<span className="lead">{item.nombreTarea}</span>
								<button
									type="button"
									className="ml-2 mb-1 close"
									data-dismiss="toast"
									aria-label="Close"
									onClick={() => delArrayElement(item.id)}>
									<span aria-hidden="true">&times;</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
