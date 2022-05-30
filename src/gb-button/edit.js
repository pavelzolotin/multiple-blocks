/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	RichText,
	InspectorControls,
	URLInput,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**A simple JavaScript utility for conditionally joining classNames together.*/
import classnames from 'classnames';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

function ButtonEdit(props) {
	const { attributes, setAttributes } = props;
	const { url, text, title, textAlignment, gbButtonWidth } = attributes;

	const setButtonText = (newText) => {
		setAttributes({ text: newText });
	};

	const onChangeButtonAlignment = (newAlignment) => {
		setAttributes({ textAlignment: newAlignment });
	};

	const onChangeURL = (newURL) => {
		setAttributes({ url: newURL });
	};

	const alignClasses = classnames(`gb-button-align-${textAlignment}`);

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={textAlignment}
					onChange={onChangeButtonAlignment}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Button Settings', 'gb-button')}>
					<ToggleControl
						label={__('Change button width', 'gb-button')}
						className="toggleImage"
						help={
							gbButtonWidth
								? __('Width 100%', 'gb-button')
								: __('Default width', 'gb-button')
						}
						onChange={(boolean) => {
							setAttributes({ gbButtonWidth: boolean });
						}}
						checked={gbButtonWidth}
					/>
					<URLInput
						className="wp-block-multiple-blocks-gb-button__input"
						value={url}
						onChange={onChangeURL}
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({
					className: alignClasses,
				})}
			>
				<>
					<div className="wp-block-multiple-blocks-gb-button__wrapper">
						<div
							className={`wp-block-multiple-blocks-gb-button__btn ${
								gbButtonWidth ? 'full-width' : ''
							}`}
						>
							<RichText
								className="wp-block-multiple-blocks-gb-button__btn-text"
								href={url}
								aria-label={__('Button text', 'gb-button')}
								placeholder={__('Add text…', 'gb-button')}
								title={title}
								value={text}
								onChange={(value) => setButtonText(value)}
								identifier="text"
								allowedFormats={['core/bold', 'core/italic']}
							/>
						</div>
					</div>
				</>
			</div>
		</>
	);
}

export default ButtonEdit;
