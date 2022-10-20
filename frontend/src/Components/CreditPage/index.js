import React from 'react';
import './CreditBar.css';
export default function CreditBar() {
	return (
		<div className="credit-bar-wrapper">
			<h3>Contacts:</h3>
			<div className="contact-info">
				<a
					href="https://www.linkedin.com/in/nhut-linh-ngo/"
					target="_blank"
					className="contact-info-links"
				>
					<i class="fa-brands fa-linkedin"></i> Linkedin
				</a>
			</div>
			<div className="contact-info">
				<a
					href="https://github.com/NhutLinh-Ngo"
					target="_blank"
					className="contact-info-links"
				>
					<i class="fa-brands fa-github"></i> GitHub
				</a>
			</div>
			<div className="contact-info">
				<a
					href="mailto:nngo6133@gmail.com"
					target="_blank"
					className="contact-info-links"
				>
					<i class="fa-sharp fa-solid fa-envelope"></i> Mail
				</a>
			</div>
		</div>
	);
}
