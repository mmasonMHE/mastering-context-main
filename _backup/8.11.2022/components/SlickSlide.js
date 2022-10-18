import React from "react";
import JsonDebugger from "./JsonDebugger";
import { Button } from "@mui/material";
const SlickSlide = ({
	currentElement,
	indx,
	onclick,
	listIndex,
	text,
	buttonLabel,
	hasHero,
}) => {
	return indx > 0 || !hasHero ? (
		<li style={{ display: "inline-block" }} key={currentElement.TextId}>
			<div className="tileWrapper">
				<a
					className="raisedBox tile isText hasMetadataOverlay isFreeText noLabels"
					role="link"
				>
					<div className="tileHeader">
						<div className="titleDesc">
							<h3 className="title ">{currentElement.Title}</h3>
						</div>
						<div className="tileTextType">
							<p className="textTypeLabel pink">{currentElement.TextType}</p>
						</div>
					</div>
					<div className="wrapper">
						<div className="coverArtWrapper">
							<div className="solidBackground"></div>
							<img src={currentElement.CoverArt} alt="" />
						</div>
						<div className="overlay">
							<footer>
								<div className="left">
									<span
										className="pagecount textTypeLabel pink"
										title="# of Pages"
									>
										{Math.floor(currentElement.PageCount)} pgs
									</span>
									<span
										className="gradelevels textTypeLabel pink"
										title="Grade Levels"
									>
										6-10th
									</span>
									<span
										className="lexile textTypeLabel pink"
										title="Lexile Level"
									>
										{currentElement.Lexile}
									</span>
								</div>
								<div>
									<Button
										variant="contained"
										onClick={() => onclick(listIndex, indx, text)}
									>
										{buttonLabel}
									</Button>
								</div>
								<div className="right">
									<button
										className="alfe13 alfe5 contentTile_btnSaveForLater__2e5R9 contentTile_actionButton__2bQwN btnSaveForLater"
										type="button"
										aria-label="Bookmark"
										title="Bookmark"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											strokeWidth="0.2"
											fill="#263237"
											stroke="#263237"
											width="20"
											height="35"
											viewBox="2.500000476837158 1.0700000524520874 11 12.999992370605469"
										>
											<path d="M13.207 14.069a.312.312 0 0 1-.184-.063L8 10.031l-5.023 3.975a.295.295 0 0 1-.311.035.291.291 0 0 1-.166-.263V1.361c0-.161.131-.291.293-.291h10.414c.162 0 .293.13.293.291v12.417a.291.291 0 0 1-.293.291zM8 9.367c.066 0 .131.022.183.063l4.73 3.744V1.652H3.087v11.522l4.73-3.744A.296.296 0 0 1 8 9.367z"></path>
										</svg>
									</button>
									<button
										className="alfe13 alfe5 contentTile_actionButton__2bQwN btnTileInfo"
										type="button"
										aria-label="Info"
										title="Assignment info"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 100 100"
											width="35"
											height="35"
											fill="#263237"
											stroke="#263237"
										>
											<path d="M50 17.4C32 17.4 17.4 32 17.4 50S32 82.6 50 82.6 82.6 68 82.6 50 68 17.4 50 17.4zm0 62.2c-16.3 0-29.6-13.3-29.6-29.6S33.7 20.4 50 20.4 79.6 33.7 79.6 50 66.3 79.6 50 79.6zm-1.5-40.4h3V33h-3v6.2zm0 27.7h3V43.5h-3v23.4z"></path>
										</svg>
									</button>
									<button
										className="alfe13 alfe5 btnAssignToclassNamees contentTile_actionButton__2bQwN"
										type="button"
										title="Assign to classNamees"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18px"
											height="18px"
											fill="#263237"
											stroke="#263237"
											viewBox="1 1 12 12"
										>
											<path d="M7 1v12M13 7H1"></path>
										</svg>
									</button>
								</div>
							</footer>
						</div>
					</div>
				</a>
			</div>
		</li>
	) : (
		<li
			style={{ display: "inline-block", width: "400px", marginRight: "20px" }}
			key={currentElement.TextId}
		>
			<div className="tileWrapper">
				<a
					className="raisedBox tile isText heroTile isFreeText noLabels"
					data-learnentityid="645130"
					data-layerid="3945370"
				>
					<div className="tileHeader">
						<div className="titleDesc">
							<h3 className="title ">{currentElement.Title}</h3>
						</div>
						<div className="tileTextType">
							<p className="textTypeLabel pink">NEW</p>
						</div>
					</div>
					<div className="wrapper">
						<div className="coverArtWrapper">
							<div className="solidBackground"></div>
							<img src={currentElement.CoverArt} alt="" loading="lazy" />
						</div>
						<div className="overlay">
							<footer>
								<div className="left">
									<span
										className="pagecount textTypeLabel pink"
										title="# of Pages"
									>
										2 pgs
									</span>
									<span
										className="gradelevels textTypeLabel pink"
										title="Grade Levels"
									>
										8-11th
									</span>
									<span
										className="lexile textTypeLabel pink"
										title="Lexile Level"
									>
										1110L
									</span>
									<span
										onClick={() => onclick(listIndex, indx, text)}
										className="lexile textTypeLabel"
										title="Lexile Level"
										style={{
											backgroundColor: "red",
											color: "white",
											cursor: "pointer",
										}}
									>
										{buttonLabel}
									</span>
								</div>
								<div className="right">
									<button
										className="alfe10 alfe2 contentTile_actionButton__2bQwN btnTileInfo"
										type="button"
										aria-label="Info"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 100 100"
											width="35"
											height="35"
											fill="#263237"
											stroke="#263237"
										>
											<path d="M50 17.4C32 17.4 17.4 32 17.4 50S32 82.6 50 82.6 82.6 68 82.6 50 68 17.4 50 17.4zm0 62.2c-16.3 0-29.6-13.3-29.6-29.6S33.7 20.4 50 20.4 79.6 33.7 79.6 50 66.3 79.6 50 79.6zm-1.5-40.4h3V33h-3v6.2zm0 27.7h3V43.5h-3v23.4z"></path>
										</svg>
									</button>
								</div>
							</footer>
						</div>
					</div>
				</a>
			</div>
		</li>
	);
};

export default SlickSlide;
