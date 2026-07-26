interface Props{
children:string;
}

export default function Title({children}:Props){

return(
<h1 className="card-title">
{children}
</h1>
);

}
