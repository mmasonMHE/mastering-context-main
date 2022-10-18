import { useEffect, useState } from "react";
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
	GetAllBuckets,
	GetAllSubjects,
	GetAllTexts,
	GetAllTopics,
	GetTextsByTopicBucketId,
	GetAllPageConfigs,
} from "../../data/articleData";
import {
	ArticleContext_ArticlesState,
	ArticleContext_ManageArticlesDispatch,
} from "../../context/mockup-context-selector";
import SlickSlider from "../../components/SlickSlider";
import LiSlider from "../../components/LiSlider";
import SelectList from "../../components/selectList";
const index = () => {
	const View = () => {
		const contextActions = ArticleContext_Actions();
		const mockupData = ArticleContext_ArticlesState();
		const ArticleReducer = ArticleContext_ManageArticlesDispatch();

		// BUTTON CLICKS CHANGE VIEW STATE
		const [view, setView] = useState("view");
		const [selectedPageConfigId, setSelectedPageConfigId] = useState(-1);
		const [selectedPageConfigData, setSelectedPageConfigData] = useState({});
		const [reset, doReset] = useState(false);
		const [createConfigSelectedSubject, setCreateConfigSelectedSubject] =
			useState("");
		const [createConfigSelectedTopic, setCreateConfigSelectedTopic] =
			useState("");
		const [newTextList, doAddItemToTextList] = useState([]);
		const [newConfig, setNewConfig] = useState([]);
		const [showJson, toggleShowJson] = useState(false);
		const addItemToTextList = (text) => {
			doAddItemToTextList([...newTextList, text]);
		};

		useEffect(() => {
			const Subjects = GetAllSubjects();
			const Topics = GetAllTopics();
			const Buckets = GetAllBuckets();
			const Texts = GetTextsByTopicBucketId(1);
			const PageConfigs = GetAllPageConfigs();
			ArticleReducer({
				type: contextActions.SEED_STATE,
				payload: { Subjects, Topics, Buckets, Texts, PageConfigs },
			});
		}, [reset]);

		const Subjects = mockupData.Subjects;
		const Topics = mockupData.Topics;
		const Buckets = mockupData.Buckets;
		const Texts = mockupData.Texts;
		const PageConfigs = mockupData.PageConfigs;

		// -------- Button Clicks Change View State ----------
		const selectPageConfig = (selectedValue, extendedProps) => {
			setSelectedPageConfigId(selectedValue);
			console.info("Page Configs", PageConfigs);
			const data = PageConfigs.filter((d) => d.PageId === selectedValue);
			if (data.length) {
				setSelectedPageConfigData(data[0]);
			}
		};

		// -------- Button Clicks Change View State ----------
		const getTextListByIdList = (idArray) => {
			const TextArray = [];
			for (let i = 0; i < idArray.length; i++) {
				for (let t = 0; t < Texts.length; t++) {
					if (idArray[i].Text === Texts[t].LearnEntityId) {
						TextArray.push(Texts[t]);
					}
				}
			}
			TextArray.sort((a, b) => a.DisplayOrder - b.DisplayOrder);
			return TextArray;
		};
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
				<div style={{ display: "flex", gap: "1em" }}>
					<SelectList
						defaultValue=""
						disabled={false}
						label="Select Page Config"
						callback={selectPageConfig}
						data={PageConfigs}
						idField="PageId"
						displayField="PageName"
						extendedProps="none"
					/>
				</div>
				<div>
					<>
						<div
							style={{
								border: "1px dotted silver",
								maxWidth: "1380px",
								padding: "1em",
								margin: "1em",
							}}
						>
							{selectedPageConfigData?.PageSections && (
								<div>
									<h3>{selectedPageConfigData.PageName}</h3>
									{selectedPageConfigData.PageSections.map((section) => (
										<div>
											<h3>{section.PageSectionName}</h3>
											<SlickSlider
												newTextList={getTextListByIdList(
													section.PageSectionTexts
												)}
											/>
										</div>
									))}
								</div>
							)}
						</div>
					</>
				</div>
			</div>
		);
	};
	return (
		<ArticleContextProvider>
			<View />
		</ArticleContextProvider>
	);
};

export default index;

// //ARCHIVE
// <div style={{ display: "none", gap: "1em" }}>
// 					<Button
// 						disabled={view !== "view"}
// 						variant="outlined"
// 						onClick={() => {
// 							initializeCreate();
// 						}}
// 					>
// 						Create New Catalog Page
// 					</Button>
// 					<Button
// 						disabled={view !== "view"}
// 						variant="outlined"
// 						onClick={() => {
// 							initializeCreate();
// 						}}
// 					>
// 						Edit Catalog Page
// 					</Button>
// 					<Button
// 						disabled={view !== "view"}
// 						variant="outlined"
// 						onClick={() => {
// 							initializeCreate();
// 						}}
// 					>
// 						Manage Properties
// 					</Button>
// 				</div>

// 				<div style={{ display: "flex", gap: "10px" }}>
// 					<SelectList
// 						defaultValue=""
// 						disabled={view !== "view"}
// 						label="Load Catalog Config"
// 						callback={initializeEdit}
// 						data={PageConfigs}
// 						idField="PageId"
// 						displayField="PageName"
// 						extendedProps="edit"
// 					/>

// 					<Button
// 						disabled={view !== "view"}
// 						variant="outlined"
// 						onClick={() => {
// 							initializeCreate();
// 						}}
// 					>
// 						Create Catalog Config
// 					</Button>
// 				</div>

// 				{view === "create" && (
// 					<div>
// 						<div style={{ display: "flex", gap: "2em" }}>
// 							<SelectList
// 								defaultValue=""
// 								disabled={false}
// 								label="Select Subject"
// 								callback={setCreateConfigSelectedSubject}
// 								data={Subjects}
// 								idField="SubjectId"
// 								displayField="SubjectName"
// 								extendedProps="edit"
// 							/>
// 							<SelectList
// 								defaultValue=""
// 								disabled={false}
// 								label="Select Topic"
// 								callback={setCreateConfigSelectedTopic}
// 								data={Topics.filter(
// 									(i) => i.SubjectId === createConfigSelectedSubject
// 								)}
// 								idField="TopicId"
// 								displayField="TopicName"
// 							/>
// 						</div>

// 						<div style={{ width: "100%", display: "block" }}>
// 							<div style={{ maxWidth: "1390px" }}>
// 								<SlickSlider newTextList={newTextList} />
// 							</div>
// 							<div>{newTextList.length}</div>
// 							<div style={{ maxWidth: "1390px" }}>
// 								<LiSlider
// 									addItemToTextList={addItemToTextList}
// 									newTextList={newTextList}
// 								/>
// 							</div>
// 						</div>
// 						<Button onClick={() => clearEditorState()}>cancel</Button>
// 					</div>
// 				)}
// 				<Button onClick={() => toggleShowJson(!showJson)}>Json</Button>
// 				{showJson === true && <pre>{JSON.stringify(mockupData, null, 2)}</pre>}
