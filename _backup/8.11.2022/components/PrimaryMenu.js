import {
	MenuContextProvider,
	MenuContext_doUpdateProfileSet,
	MenuContext_profileSet,
	MenuContext_primaryMenuItems,
	MenuContext_doMenuDispatch,
	MenuContext_menuState,
} from "../context/menu-context-selector";

import {useUser} from "../context/store-context-selector";

export default function PrimaryMenu() {
	return (
		// <MenuContextProvider>
			<PrimaryMenuContent />
		// </MenuContextProvider>
	);
}
function PrimaryMenuContent() {
	const doUpdate = MenuContext_doUpdateProfileSet();
	let items = MenuContext_primaryMenuItems();
	let profileSet = MenuContext_profileSet();
	let doMenuDispatch = MenuContext_doMenuDispatch();
	let ditems = MenuContext_menuState();
        let user = useUser();

	return (
		<div>
                        <h1>Primary Menu : {user}</h1>
			{items} {profileSet}
			<input type="text" onChange={(t) => doUpdate(t.target.value)} value={profileSet} />
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
