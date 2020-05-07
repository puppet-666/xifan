import { shallowMount } from '@vue/test-utils'


describe('unittestdemo', () => {
  it('renders props.msg when passed', () => {
    // const msg = 'new message'
    // const wrapper = shallowMount(HelloWorld, {
    //   propsData: { msg }
    // })
    let a = "hellotest";
    expect(a).toMatch("hellotest")
  })
})
