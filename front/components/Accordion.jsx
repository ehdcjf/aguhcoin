import Styled from 'styled-components'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const Accordion = ({visible,handleToggle}) => {

    const {menu} = useSelector( (state)=>state.category )

    const handleClick = () => {
        handleToggle()
    }

    const category = menu.map( (v)=>{
        return <li key={v.id} onClick={handleToggle}><Link href={v.url}><a>{v.category}</a></Link></li>
    })

    return (
        <>
            <AccordionMenu flag={visible}>
                <ul>
                    {category}
                </ul>
            </AccordionMenu>
        </>
    )
}

export default Accordion

const AccordionMenu = Styled.div`
position:absolute;
width:100%;
left:0px;
top:10vh;
z-index:5;
background:#fff;
padding:7vh 0;

display:${props=> (props.flag ? 'block' : 'none') };

& > ul {
    display:flex;
    flex-direction:column;
}

& > ul > li {
    margin-top:20px;
    text-align:center;
}
`

