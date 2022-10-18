import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {
	ArticleContextProvider,
	ArticleContext_Actions,
} from "../../context/mockup-context-selector";
import {
	GetArticleSubjects,
	GetArticleTopicsBySubject,
	GetTopicBucketByTopicId,
	GetTextsByTopicBucketId,
} from "../../data/articleData";
import {
	ArticleContext_ArticlesState,
	ArticleContext_ManageArticlesDispatch,
} from "../../context/mockup-context-selector";
import SlickSlider from "../../components/SlickSlider";

import LiSlider from "../../components/LiSlider";

const index = () => {
	const DisplayTexts = () => {
		const contextActions = ArticleContext_Actions();
		const mockupData = ArticleContext_ArticlesState();
		const ArticleReducer = ArticleContext_ManageArticlesDispatch();
		const [reset, doReset] = useState(false);

		const Subjects = mockupData.Subjects;
		const Topics = mockupData.Topics;
		const Buckets = mockupData.Buckets;
		const Texts = mockupData.Texts;

		useEffect(() => {
			const Subjects = GetArticleSubjects();
			const Topics = GetArticleTopicsBySubject(2);
			const Buckets = GetTopicBucketByTopicId(2);
			const Texts = GetTextsByTopicBucketId(1);
			ArticleReducer({
				type: contextActions.SEED_STATE,
				payload: { Subjects, Topics, Buckets, Texts },
			});
		}, [reset]);

		const TextItems = Texts.map((text) => (
			<li key={text.Title}>
				{text.Title}
				<span>
					<i>{text.Author}</i>
				</span>
			</li>
		));

		return (
			<div
				style={{
					backgroundColor: "#EDEFF1",
					height: "100vh",
					width: "100vw",
					position: "fixed",
					overflow: "auto",
					padding: "3em",
				}}
			>
				<div
					style={{
						padding: "10px",
						display: "flex",
						justifyContent: "left",
						gap: "10px",
					}}
				>
					{Subjects && (
						<Box width="250px">
							<TextField label="Load Catalog Config" fullWidth select>
								{Subjects.map((s, i) => (
									<MenuItem key={i} value={s.SubjectId}>
										{s.SubjectName}
									</MenuItem>
								))}
							</TextField>
						</Box>
					)}
					<Button variant="outlined">Create Catalog Config</Button>
				</div>

				<div style={{ maxWidth: "1390px" }}>
					<SlickSlider />
				</div>

				<div
					style={{
						maxWidth: "1390px",
						height: "420px",
						overflow: "hidden",
						padding: "10px",
					}}
				>
					{/* <LiSlider /> */}
				</div>

				<Button onClick={() => ArticleReducer({ type: "DELETE" })}>
					Clear State Texts
				</Button>
				<Button
					onClick={() =>
						ArticleReducer({ type: "ADD_SUBJECT", payload: "NLA" })
					}
				>
					Add Random Subject
				</Button>
				<Button onClick={() => doReset(!reset)}>Reset</Button>
				<Button onClick={() => ArticleReducer({ type: "TEST", payload: {} })}>
					Clear All State
				</Button>

				<div>
					<Typography variant="h1">Test h1</Typography>
					<h2>Subject</h2>
					{Subjects &&
						Subjects.map((i) => <li key={i.SubjectId}>{i.SubjectName}</li>)}
					<h2>Topics in Subject</h2>
					{Topics && Topics.map((i) => <li key={i.TopicId}>{i.TopicName}</li>)}
					<h2>Buckets in Topic</h2>
					{Buckets &&
						Buckets.map((i) => (
							<li key={i.TopicBucketId}>{i.TopicBucketName}</li>
						))}
					<h3>Refactored Texts</h3>
					<ul>{TextItems}</ul>
				</div>
			</div>
		);
	};

	return (
		<ArticleContextProvider>
			<DisplayTexts />
		</ArticleContextProvider>
	);
};

export default index;
