import {
	MenuContextProvider,
	MenuContext_doUpdateProfileSet,
	MenuContext_profileSet,
	MenuContext_primaryMenuItems,
	MenuContext_doMenuDispatch,
	MenuContext_menuState,
} from "../context/menu-context-selector";

export default function SecondaryMenu() {
	return (		
			<SecondaryMenuContent />		
	);
}
function SecondaryMenuContent() {
	const doUpdate = MenuContext_doUpdateProfileSet();
	let items = MenuContext_primaryMenuItems();
	let profileSet = MenuContext_profileSet();
	let doMenuDispatch = MenuContext_doMenuDispatch();
	let ditems = MenuContext_menuState();

	return (
		<div><h2>Secondary Menu</h2>
			{items} {profileSet}
			<input type="text" onChange={(t) => doUpdate(t.target.value)} />
			<br />
			{ditems}
			<button type="button" onClick={() => doMenuDispatch({ type: "test" })}>
				Special Items from Context
			</button>
                        <button type="button" onClick={() => doMenuDispatch({ type: "" })}>
				Reset to initial state
			</button>
		</div>
	);
}
