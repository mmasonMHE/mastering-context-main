import { useState } from "react";
import Slider from "react-slick";
import SlickSlide from "./SlickSlide";
import { ArticleContext_ArticlesState } from "../context/mockup-context-selector";

export default function SlickSlider({ newTextList }) {
	//const mockupData = ArticleContext_ArticlesState();
	const [stateTextList, setStateTextList] = useState(newTextList);
	const settings = {
		className: "center",
		infinite: true,
		centerPadding: "60px",
		slidesToShow: 5,
		slidesToScroll: 4,
		swipeToSlide: true,
		afterChange: function (index) {
			console.log(`Slider Changed to: ${index + 1}`);
		},
	};
	const deleteSlide = (LearnEntityId) => {
		//delete item at this index
		const newl = stateTextList.filter(
			(item) => item.LearnEntityId != LearnEntityId
		);
		setStateTextList(newl);
	};
	return (
		<div
			style={{
				padding: "20px",
				margin: "30px",
				maxHeight: "300px",
				overflow: "hidden",
			}}
		>
			<Slider {...settings}>
				{stateTextList.map((i, index) => (
					<SlickSlide
						key={index}
						currentElement={i}
						deleteSlide={deleteSlide}
						iindex={index}
					/>
				))}
			</Slider>
		</div>
	);
}
