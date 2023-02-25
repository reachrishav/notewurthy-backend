const Footer = () => {
  return (
    <footer className='light-text-color'>
      <p>
        Made with ❤️ by{" "}
        <a
          href='https://www.linkedin.com/in/reachrishav/'
          target='_blank'
          rel='noreferrer'
        >
          <span className='blue'>Rishav Ghosh</span>
        </a>{" "}
        - {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer
