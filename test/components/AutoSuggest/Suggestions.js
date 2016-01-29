import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Suggestions from './../../../src/components/AutoSuggest/Suggestions';

function setup() {
	let props = {
		results: [],
		dispatch: () => {}
	}

	let renderer = TestUtils.createRenderer()
	renderer.render(<Suggestions {...props} />)
	let output = renderer.getRenderOutput()

	return {
		props,
		output,
		renderer
	}
}

describe('AutoSuggest', () => {
	
	describe('Suggestions', () => {

		it('should render correctly', () => {

			const { output } = setup()

			expect( output.type ).toBe('div')
			
			expect( output.props.className ).toBe('ola-suggestions-wrapper')

		})

	})

})