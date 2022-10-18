import { useBaseColor, setBaseColor } from "../context/store-context-selector";
import Nest from "./Nest";
const ColorSection = () => {
	const myColor = useBaseColor();
	return (
		<div style={{ backgroundColor: myColor }}>
			<Nest>
				<Nest>
					<Nest>
						<Nest>
							<SetColorSection />
							This div has some background color set at the top. This is a different section nested in components
						</Nest>
					</Nest>
				</Nest>
			</Nest>
		</div>
	);
};

const SetColorSection = () => {
	const myColor = useBaseColor();
	const sbc = setBaseColor();
	return (
		<Nest>
			<Nest>
				<Nest>
					<input type="color" onChange={(t) => sbc(t.target.value)} />
				</Nest>
			</Nest>
		</Nest>
	);
};
export default ColorSection;
