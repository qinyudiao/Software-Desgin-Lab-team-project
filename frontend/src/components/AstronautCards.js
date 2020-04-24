import React from 'react'
import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl'


export default function GenerateUSAstronautCards(props){
      var counter = 0;
      return (
        <Grid>
            <div className="projects-grid" style={{display: 'flex', flex: 1, flexWrap: 'wrap'}}>
             {
                props.data.map(row => (
                  <Cell col={3}>
                    <Card shadow={5} style={{minWidth: '450', margin:'auto'}}>
                    {(row.wikiInfo.image !== 'Not Found')
                      ? <CardTitle style={{color: '#fff', height: '350px', background:'url('+row.wikiInfo.image+') center / cover'}}>{row.Astronaut}</CardTitle>
                      : <CardTitle style={{color: '#fff', height: '350px', background:'url(https://cdn2.iconfinder.com/data/icons/russia-9/64/astronaut-avatar-profile-man-russia-512.png) center / cover'}}>{row.Astronaut}</CardTitle>
                    }
                          <CardActions border>
                            <CardText style={{color:'#000', textAlign:'center', fontSize:'20px'}}>
                              {row.Astronaut}
                            </CardText>
                          </CardActions>
                          <CardActions border>
                            <CardText style={{color:'#000', textAlign:'left', fontSize:'14px'}}>
                              • STATUS: {row.Status}
                              <br/>
                              • TOTAL SPACE TIME: {row['Cumulative hours of space flight time']}
                              <br/>
                              • # MISSIONS: {row['# Flights']}
                              <br/>
                              • MISSIONS: {row['Missions flown']}
                            </CardText>
                          </CardActions>
                      <CardActions border>
                        <Button onClick={event =>  window.location.href='/USAstronauts/'+row.Astronaut+'/USAstronauts'}>More Info.</Button>
                      </CardActions>
                      <CardMenu style={{color: '#fff'}}>
                        <IconButton name="share" />
                      </CardMenu>
                    </Card>
                  </Cell>

                ))
             }
            </div>
        </Grid>
      )
}

export function GenerateRussianAstronautCards(props)
{
  var counter = 0;
  return (
    <Grid>
        <div className="projects-grid" style={{display: 'flex', flex: 1, flexWrap: 'wrap'}}>
         {
            props.data.map(row => (
              <Cell col={3}>
                <Card shadow={5} style={{minWidth: '450', margin:'auto'}}>
                {(row.wikiInfo.image !== 'Not Found')
                  ? <CardTitle style={{color: '#fff', height: '350px', background:'url('+row.wikiInfo.image+') center / cover'}}>{row.A}</CardTitle>
                  : <CardTitle style={{color: '#fff', height: '350px', background:'url(https://cdn2.iconfinder.com/data/icons/russia-9/64/astronaut-avatar-profile-man-russia-512.png) center / cover'}}>{row.Astronaut}</CardTitle>
                }
                      <CardActions border>
                        <CardText style={{color:'#000', textAlign:'center', fontSize:'20px'}}>
                          {row.A}
                        </CardText>
                      </CardActions>
                      <CardActions border>
                        <CardText style={{color:'#000', textAlign:'left', fontSize:'14px'}}>
                          • STATUS: {row.C}
                          <br/>
                          • TOTAL SPACE TIME: {row.G}
                          <br/>
                          • # MISSIONS: {row.B}
                          <br/>
                          • MISSIONS: {row.F}
                        </CardText>
                      </CardActions>
                  <CardActions border>
                    <Button onClick={event =>  window.location.href='/RussianAstronauts/'+row.A+'/RussianAstronauts'}>More Info.</Button>
                  </CardActions>
                  <CardMenu style={{color: '#fff'}}>
                    <IconButton name="share" />
                  </CardMenu>
                </Card>
              </Cell>

            ))
         }
        </div>
    </Grid>
  )
}

export function GenerateInternationalAstronautCards(props)
{
  var counter = 0;
  return (
    <Grid>
        <div className="projects-grid" style={{display: 'flex', flex: 1, flexWrap: 'wrap'}}>
         {
            props.data.map(row => (
              <Cell col={3}>
                <Card shadow={5} style={{minWidth: '450', margin:'auto'}}>
                {(row.wikiInfo.image !== 'Not Found')
                  ? <CardTitle style={{color: '#fff', height: '350px', background:'url('+row.wikiInfo.image+') center / cover'}}>{row.A}</CardTitle>
                  : <CardTitle style={{color: '#fff', height: '350px', background:'url(https://cdn2.iconfinder.com/data/icons/russia-9/64/astronaut-avatar-profile-man-russia-512.png) center / cover'}}>{row.Astronaut}</CardTitle>
                }
                      <CardActions border>
                        <CardText style={{color:'#000', textAlign:'center', fontSize:'20px'}}>
                          {row.A}
                        </CardText>
                      </CardActions>
                      <CardActions border>
                        <CardText style={{color:'#000', textAlign:'left', fontSize:'16px'}}>
                          • STATUS: {row.F}
                          <br/>
                          • # HOURS IN SPACE: {row.K}
                          <br/>
                          • # OF MISSIONS: {row.E}
                          <br/>
                          • MISSIONS: {row.J}
                        </CardText>
                      </CardActions>
                  <CardActions border>
                    <Button onClick={event =>  window.location.href='/InternationalAstronauts/'+row.A+'/InternationalAstronauts'}>More Info.</Button>
                  </CardActions>
                  <CardMenu style={{color: '#fff'}}>
                    <IconButton name="share" />
                  </CardMenu>
                </Card>
              </Cell>

            ))
         }
        </div>
    </Grid>
  )
}


export function GenerateAgencyCards(props)
{
  var counter = 0;
  return (
    <Grid>
        <div className="projects-grid" style={{display: 'flex', flex: 1, flexWrap: 'wrap'}}>
         {
            props.data.map(row => (
              <Cell col={6}>
                <Card shadow={5} style={{width: '600px', margin:'auto'}}>
                {(row.wikiInfo.image !== 'Not Found')
                  ? <CardTitle style={{color: '#fff', height: '500px', background:'url('+row.wikiInfo.image+') center / cover'}}>{row.A}</CardTitle>
                  : <CardTitle style={{color: '#fff', height: '500px', background:'url(https://cdn2.iconfinder.com/data/icons/russia-9/64/astronaut-avatar-profile-man-russia-512.png) center / cover'}}>{row.Astronaut}</CardTitle>
                }
                      <CardActions border>
                        <CardText style={{color:'#000', textAlign:'center', fontSize:'20px'}}>
                          {row.name}
                        </CardText>
                      </CardActions>
                      <CardActions border>
                        <CardText style={{color:'#000', textAlign:'left', fontSize:'20px'}}>
                          • COUNTRY: {row.countryCode}
                        </CardText>
                      </CardActions>
                  <CardActions border>
                    <Button onClick={event =>  window.location.href='/agency/'+row.name}>More Info.</Button>
                    <Button href={row.wikiURL}>Wikipida Page.</Button>
                  </CardActions>
                  <CardMenu style={{color: '#fff'}}>
                    <IconButton name="share" />
                  </CardMenu>
                </Card>
              </Cell>

            ))
         }
        </div>
    </Grid>
  )
}


export function GenerateLaunchCards(props)
{
  var counter = 0;
  return (
    <Grid>
        <div className="projects-grid" style={{display: 'flex', flex: 1, flexWrap: 'wrap'}}>
         {
            props.data.map(row => (
              <Cell col={3}>
                <Card shadow={5} style={{width: '450px', margin:'auto'}}>
                {(row.rocketData.imageURL !== '')
                  ? <CardTitle style={{color: '#fff', height: '350px', background:'url('+row.rocketData.imageURL+') center / cover'}}>{row.name}</CardTitle>
                  : <CardTitle style={{color: '#fff', height: '350px', background:'url(https://cdn2.iconfinder.com/data/icons/russia-9/64/astronaut-avatar-profile-man-russia-512.png) center / cover'}}>{row.Astronaut}</CardTitle>
                }
                      <CardActions border>
                        <CardText style={{color:'#000', textAlign:'center', fontSize:'20px'}}>
                          {row.name}
                        </CardText>
                      </CardActions>
                      <CardActions border>
                        <CardText style={{color:'#000', textAlign:'center', fontSize:'20px'}}>
                          {row.locationData.name}
                        </CardText>
                      </CardActions>
                      <CardActions border>
                        <CardText style={{color:'#000', textAlign:'center', fontSize:'20px'}}>
                          {row.isonet.slice(4,6)}/{row.isonet.slice(6,8)}/{row.isonet.slice(0,4)} @ {row.isonet.slice(9,11)}:{row.isonet.slice(11,13)}:{row.isonet.slice(13,15)}
                        </CardText>
                      </CardActions>
                  <CardActions border>
                    <Button onClick={event =>  window.location.href='/launch/'+row.name+'/launch'}>More Info.</Button>
                    <Button href={row.vidURLs[0]}>Youtube Link.</Button>
                  </CardActions>
                  <CardMenu style={{color: '#fff'}}>
                    <IconButton name="share" />
                  </CardMenu>
                </Card>
              </Cell>

            ))
         }
        </div>
    </Grid>
  )
}
