import React from "react";
import Slider from "react-slick";
import SlickSlide from "./SlickSlide";
import { ArticleContext_ArticlesState } from "../context/mockup-context-selector";
import { Hidden } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function LiSlider({ addItemToTextList, newTextList }) {
	const mockupData = ArticleContext_ArticlesState();

	return (
		<div>
			<ul
				style={{
					margin: "0",
					padding: "0",
					overflowX: "scroll",
					display: "inlineBlock",
					zoom: ".5",
				}}
			>
				{mockupData.Texts.map((currentElement, index) => (
					<SlickSlide
						key={index}
						currentElement={currentElement}
						addItemToTextList={addItemToTextList}
					/>
				))}
			</ul>
			;
		</div>
	);
}
