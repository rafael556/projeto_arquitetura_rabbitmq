import Styles from "./header-styles.module.scss";

import React, { memo } from "react";

const Header: React.FC = () => {
	return (
		<header className={Styles.headerWrap}>
			<div className={Styles.headerContent}>
				<h1>Projeto Arquitetura Software</h1>
			</div>
		</header>
	);
};

export default memo(Header);
