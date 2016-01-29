import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Input from './../../../src/components/AutoSuggest/Input';

function setup() {

	let props = {
	    onChange: expect.createSpy(),
	    q: 'Terminator'
	 }
	
	let renderer = TestUtils.createRenderer()
	renderer.render(<Input {...props}  />)
	let output = renderer.getRenderOutput()

	return {		
		output,
		renderer,
		props,
	}
}

describe('AutoSuggest', () => {
	
	describe('Input', () => {

		it('should render correctly', () => {

			const { output } = setup()

			expect( output.type ).toBe('div')
			
			expect( output.props.className ).toBe('ola-search-form-container')

			var input = output.props.children[0]

			expect( input.props.value ).toBe('Terminator')

		})

		it('should call onChange query', () => {

			const { output, props } = setup()

			props.onChange('')
			
			expect( props.onChange.calls.length ).toBe(1);

		})

	})

})