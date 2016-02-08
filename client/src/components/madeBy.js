import React from 'react';

class MadeBY extends React.Component {
  render(){
    return (
      <div className="container-fluid">
        <section id='about'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-12 text-center'>
                        <h2 className='section-heading'>Created By</h2>
                        
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-3 col-md-6 col-sm-12 text-center'>
                        <div>
                            <i className='fa fa-4x wow bounceIn text-primary'><img className='profile-image' src = '../assets/teampic/peter.jpg'></img></i>
                            <h3>Peter Kaiser</h3>
                            <h5>Full Stack Engineer</h5>
                            <p className='text-muted'> <a className="btn-link" href="https://github.com/pkaiserui">github.com/pkaiserui</a></p>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12 text-center'>
                        <div>
                           <i className='fa fa-4x wow bounceIn text-primary' data-wow-delay='.1s' ><img className='profile-image' src = '../assets/teampic/mick.jpg'></img></i>
                            <h3>Michael Berber</h3>
                            <h5>Full Stack Engineer</h5>
                            <p className='text-muted'> <a className="btn-link" href="https://github.com/mickberber">github.com/mickberber</a></p>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12 text-center'>
                        <div>
                            <i className='fa fa-4x wow bounceIn text-primary' data-wow-delay='.2s'><img className='profile-image' src = '../assets/teampic/sean.jpg'></img></i>
                            <h3>Sean Gibson</h3>
                            <h5>Full Stack Engineer</h5>
                            <p className='text-muted'> <a className="btn-link" href="https://github.com/seanagibson">github.com/seanagibson</a></p>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12 text-center'>
                        <div>
                            <i className='fa fa-4x wow bounceIn text-primary' data-wow-delay='.3s'><img className='profile-image' src = '../assets/teampic/tim.jpg'></img></i>
                            <h3>Tim Steele</h3>
                            <h5>Full Stack Engineer</h5>
                            <p className='text-muted'> <a className="btn-link" href="https://github.com/beresford211">github.com/beresford211</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
    )
  }
}

export default MadeBY;
