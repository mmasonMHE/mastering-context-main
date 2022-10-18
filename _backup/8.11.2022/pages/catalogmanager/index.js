import { useEffect, useState } from "react";
import {
	ArticleContext_ArticlesState,
	ArticleContext_ManageArticlesDispatch,
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
} from "../../data/mockdata";
import JsonDebugger from "../../components/JsonDebugger";
import SelectList from "../../components/selectList";
import SlickSlide from "../../components/SlickSlide";
import SlickSlider from "../../components/SlickSlider";
import App from "next/app";
import { Button, TextField, Box, Modal } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
const index = () => {
	const View = () => {
		const contextActions = ArticleContext_Actions();
		const ApplicationState = ArticleContext_ArticlesState();
		const ArticleReducer = ArticleContext_ManageArticlesDispatch();

		const [addSectionName, setAddSectionName] = useState("");

		useEffect(() => {
			//Application Fake Data Calls
			const PageConfigs = GetAllPageConfigs();
			const Texts = GetAllTexts();
			//--------------------------

			ArticleReducer({
				type: contextActions.SEED_STATE,
				payload: { PageConfigs, Texts },
			});
		}, []);

		const selectPageConfig = (pageConfig) => {
			ArticleReducer({
				type: contextActions.SET_SELECTED_PAGECONFIG,
				payload: { SelectedPageConfig: pageConfig },
			});
		};
		const deleteSlide = (listindex, itemindex) => {
			//Need to call the state reducer here...
			ApplicationState.SelectedPageConfig.PageSections[
				listindex
			].PageSectionTexts.splice(itemindex, 1);

			ArticleReducer({
				type: contextActions.UPDATE_PAGECONFIG,
				payload: {
					NewPageConfig: ApplicationState.SelectedPageConfig,
				},
			});
		};

		const doAddSection = () => {
			ApplicationState.SelectedPageConfig.PageSections.push({
				PageSectionName: addSectionName,
				HeroIndex: -1,
				PageSectionTexts: [],
			});
			ArticleReducer({
				type: contextActions.UPDATE_PAGECONFIG,
				payload: {
					NewPageConfig: ApplicationState.SelectedPageConfig,
				},
			});
			setAddSectionName("");
		};

		const getTextById = (item) => {
			const TextArray = [];
			for (let t = 0; t < ApplicationState.Texts.length; t++) {
				if (item.TextId === ApplicationState.Texts[t].TextId) {
					return ApplicationState.Texts[t];
				}
			}
			return {};
		};

		const saveUpdateSectionText = (e, psindex) => {
			ApplicationState.SelectedPageConfig.PageSections[
				psindex
			].PageSectionName = e.target.textContent;
			ArticleReducer({
				type: contextActions.UPDATE_PAGECONFIG,
				payload: {
					NewPageConfig: ApplicationState.SelectedPageConfig,
				},
			});
		};

		const mstyle = {
			position: "absolute",
			top: "50%",
			left: "55%",
			transform: "translate(-50%, -50%)",
			bgcolor: "background.paper",
			border: "1px solid #000",
			boxShadow: 24,
			width: "50%",
			maxWidth: "50%",
			p: 4,
			zoom: 0.7,
		};
		const [open, setOpen] = useState(false);
		const handleOpen = (PageSection, psindex) => {
			setModalConfig({ PageSection: PageSection, psindex: psindex });
			console.info("PageSection", PageSection, "pindex", psindex);
			setOpen(true);
		};
		const handleClose = () => setOpen(false);
		const [modalConfig, setModalConfig] = useState({
			PageSection: {},
			psindex: 0,
		});
		const addItemToTextList = (a, b, text) => {
			const pageSection = modalConfig.PageSection;
			const psindex = modalConfig.psindex;
			const newitem = { TextId: text.TextId, DisplayOrder: 10 };
			ApplicationState.SelectedPageConfig.PageSections[
				psindex
			].PageSectionTexts.push(newitem);
			ArticleReducer({
				type: contextActions.UPDATE_PAGECONFIG,
				payload: {
					NewPageConfig: ApplicationState.SelectedPageConfig,
				},
			});
		};

		const move = (arr, index, move) => {
			//move the array via imutableMove then reduce it
		};

		const immutableMove = (arr, from, to) => {
			return arr.reduce((prev, current, idx, self) => {
				if (from === to) {
					prev.push(current);
				}
				if (idx === from) {
					return prev;
				}
				if (from < to) {
					prev.push(current);
				}
				if (idx === to) {
					prev.push(self[from]);
				}
				if (from > to) {
					prev.push(current);
				}
				return prev;
			}, []);
		};

		const toggleHero = (pageSection, psindex) => {
			ApplicationState.SelectedPageConfig.PageSections[psindex].HasHero =
				!ApplicationState.SelectedPageConfig.PageSections[psindex].HasHero;
			ArticleReducer({
				type: contextActions.UPDATE_PAGECONFIG,
				payload: {
					NewPageConfig: ApplicationState.SelectedPageConfig,
				},
			});
		};

		const deletePageSectionList = (pageSection, psindex) => {
			ApplicationState.SelectedPageConfig.PageSections.splice(psindex, 1);

			ArticleReducer({
				type: contextActions.UPDATE_PAGECONFIG,
				payload: {
					NewPageConfig: ApplicationState.SelectedPageConfig,
				},
			});
		};

		const movePageSectionUp = (pageSection, psindex) => {
			//immutableMove = (arr, from, to)
			ApplicationState.SelectedPageConfig.PageSections = immutableMove(
				ApplicationState.SelectedPageConfig.PageSections,
				psindex,
				psindex - 1
			);

			ArticleReducer({
				type: contextActions.UPDATE_PAGECONFIG,
				payload: {
					NewPageConfig: ApplicationState.SelectedPageConfig,
				},
			});
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
				<div
					style={{
						padding: "1em",
						display: "block",
						width: "1380px",
						margin: "1em auto 1em auto",
					}}
				>
					<div style={{ display: "flex", gap: "1em", marginBottom: "50px" }}>
						<SelectList
							defaultValue=""
							disabled={false}
							label="Select Page Config"
							callback={selectPageConfig}
							data={ApplicationState.PageConfigs}
							idField="PageId"
							displayField="PageName"
							extendedProps="none"
						/>
					</div>
					<div style={{ minHeight: "70vh" }}>
						{ApplicationState.SelectedPageConfig ? (
							<div>
								<h2>
									Current Page Config:
									{ApplicationState.SelectedPageConfig.PageName}
								</h2>
								{ApplicationState.SelectedPageConfig.PageSections.map(
									(PageSection, psindex) => (
										<div key={psindex}>
											<div style={{ border: "none" }}>
												<div
													style={{
														width: "49%",
														display: "inline-block",
													}}
												>
													<span className="bucketTitle">
														<h1
															style={{
																width: "600px",
																cursor: "pointer",
																display: "inlineBlock",
																marginBottom: "1em",
															}}
															contentEditable
															suppressContentEditableWarning={true}
															onBlur={(e) => saveUpdateSectionText(e, psindex)}
														>
															{PageSection.PageSectionName}
														</h1>
													</span>
												</div>
												<div
													style={{
														width: "50%",
														display: "inline-block",
													}}
												>
													<Stack
														spacing={2}
														direction="row"
														justifyContent="end"
													>
														<Button
															variant="outlined"
															color="secondary"
															onClick={() =>
																//addItemToTextList(PageSection, psindex)
																handleOpen(PageSection, psindex)
															}
														>
															+ Add New Item
														</Button>
														<Button
															variant="outlined"
															color="secondary"
															onClick={() =>
																//addItemToTextList(PageSection, psindex)
																toggleHero(PageSection, psindex)
															}
														>
															Toggle Hero
														</Button>
														{psindex > 0 ? (
															<Button
																color="secondary"
																variant="contained"
																onClick={() =>
																	//addItemToTextList(PageSection, psindex)
																	movePageSectionUp(PageSection, psindex)
																}
															>
																Up
															</Button>
														) : (
															<></>
														)}
														<Button
															color="warning"
															variant="contained"
															onClick={() =>
																//addItemToTextList(PageSection, psindex)
																deletePageSectionList(PageSection, psindex)
															}
														>
															Remove Section
														</Button>
													</Stack>
												</div>
											</div>

											<div
												key={psindex}
												style={{
													display: "block",
													overflow: "hidden",
													overflowX: "scroll",
													//height: "450px",
													marginBottom: "2em",
												}}
											>
												<ul
													style={{
														display: "block",
														//height: "450px",
														overflow: "hidden",
														width:
															PageSection.PageSectionTexts.length * 350 + "px",
													}}
												>
													{PageSection.PageSectionTexts.map((text, tindex) => (
														<SlickSlide
															indx={tindex}
															currentElement={getTextById(text)}
															onclick={deleteSlide}
															textlist={PageSection.PageSectionTexts}
															listIndex={psindex}
															key={tindex}
															buttonLabel="Delete"
															hasHero={PageSection.HasHero}
														/>
													))}
												</ul>
											</div>
										</div>
									)
								)}
								<div style={{ display: "flex", gap: "1em", width: "1300px" }}>
									<div style={{ display: "inlineBlock" }}>
										<Box width="300px">
											<TextField
												id="standard-basic"
												onChange={(e) => setAddSectionName(e.target.value)}
												label="Add Section to List"
												variant="standard"
												value={addSectionName}
												fullWidth
											/>
										</Box>
									</div>
									<Button onClick={() => doAddSection()}>+</Button>
								</div>
							</div>
						) : (
							<div>
								<h2>Select a page to view and edit from the dropdown above</h2>
							</div>
						)}
					</div>

					<div>
						<JsonDebugger data={ApplicationState} label="state" />
						<JsonDebugger
							data={ApplicationState.SelectedPageConfig}
							label="selected config"
						/>
						<JsonDebugger
							data={ApplicationState.PageConfigs}
							label="page configs"
						/>
					</div>

					<Dialog
						open={open}
						onClose={handleClose}
						sx={{
							"& .MuiDialog-container": {
								"& .MuiPaper-root": {
									width: "100%",
									maxWidth: "800px", // Set your width here
								},
							},
						}}
					>
						<DialogTitle>Select additional Articles/Texts</DialogTitle>
						<DialogContent>
							<DialogContentText>
								This dialog would be defaulted to the Subject/Topic of the page.
								A filter/search option would populate it. We have 800+ articles.
								I do not know how the current buckets work but this is not
								difficult to set up as a filter system.
							</DialogContentText>
							<div style={{ zoom: 0.66 }}>
								{ApplicationState.Texts &&
									ApplicationState.Texts.map((text, tindex) => (
										<SlickSlide
											currentElement={text}
											listIndex={tindex}
											indx={tindex}
											key={tindex}
											onclick={addItemToTextList}
											text={text}
											buttonLabel="Add Item"
										/>
									))}
							</div>
						</DialogContent>
						<DialogActions>
							<Button variant="contained" color="success" onClick={handleClose}>
								Done
							</Button>
						</DialogActions>
					</Dialog>
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
