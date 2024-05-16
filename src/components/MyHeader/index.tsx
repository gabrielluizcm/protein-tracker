import proteinImage from '../../images/protein.png';

export default function MyHeader() {
  return (
    <h1 className="text-gold text-3xl flex items-center gap-3">
      <img src={proteinImage} alt="Protein powder" className="w-16" />
      <span className="z-2 relative">
        <p>Protein</p>
        <p className="pl-12">Tracker</p>
      </span>
    </h1>
  )
}