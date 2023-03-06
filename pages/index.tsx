import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineCheck } from 'react-icons/ai';

const Home: NextPage = () => {
	const [task, setTask] = useState<string>('');
	const [allTasks, setAllTasks] = useState<Task[]>([]);

	interface Task {
		id: string;
		title: string;
		completed: boolean;
		createdAt: Date;
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const taskObj: Task = {
			id: uuidv4(),
			title: task,
			completed: false,
			createdAt: new Date(),
		};

		setAllTasks([...allTasks, taskObj]);
		localStorage.setItem('taskArray', JSON.stringify(allTasks));
		setTask('');
	};

	const handleDelete = (taskName: string) => {
		let updatedTasks = allTasks.filter(item => taskName != item.title);

		localStorage.setItem('taskArray', JSON.stringify(updatedTasks));

		let tasks = localStorage.getItem('taskArray');

		if (tasks) {
			setAllTasks(JSON.parse(tasks));
		}
	};

	const handleComplete = (taskName: string) => {
		allTasks.filter(item => {
			if (taskName === item.title) {
				item.completed = true;

				console.log(item);
			}
		});

		setAllTasks([...allTasks]);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Typescript Tutorial</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='flex flex-col items-center'>
				<h1 className='my-8'>Typescript ToDo App</h1>
				<form onSubmit={handleSubmit}>
					<label className='block' htmlFor='task_input'>
						Add Task:
					</label>
					<input
						className='px-1 h-8'
						type='text'
						id='task_input'
						name='task_input'
						value={task}
						onChange={e => setTask(e.target.value)}
					/>
					<button
						className='border rounded-md h-8 p-1 ml-2 hover:cursor-pointer hover:bg-slate-300 hover:text-black'
						type='submit'
					>
						ADD
					</button>
				</form>
				<section>
					<ul className='my-8'>
						{allTasks.map(item => (
							<li
								key={item.id}
								className={`relative border rounded-md mb-4 px-4 py-2 text-center ${
									item.completed ? 'line-through' : ''
								}`}
							>
								<div>{item.title}</div>
								<button
									className='absolute border top-0 left-[-3rem] h-full w-8 flex justify-center items-center bg-red-400 hover:bg-red-600'
									type='button'
									onClick={() => handleDelete(item.title)}
								>
									x
								</button>
								<button
									className={`absolute border top-0 right-[-3rem] h-full w-8 flex justify-center items-center bg-green-400 hover:bg-green-600 ${
										item.completed && 'bg-green-800 hover:bg-green-900'
									}`}
									type='button'
									onClick={() => handleComplete(item.title)}
									disabled={item.completed && true}
								>
									<AiOutlineCheck />
								</button>
							</li>
						))}
					</ul>
				</section>
			</div>
		</div>
	);
};

export default Home;
