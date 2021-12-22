export default (price, rate) => `
<svg xmlns="http://www.w3.org/2000/svg" width="65" height="20" viewBox="0 0 65 20">
<g fill-rule="evenodd">    
    <text font-size="8.276" font-weight="bold">
        <tspan x="4" y="13">${price}</tspan>
    </text>    
    <text font-size="8.276" font-weight="bold">
        <tspan x=".37" y="8">${rate}</tspan>
    </text>
</g>
</svg>`;
