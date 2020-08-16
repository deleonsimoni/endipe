import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-virtual',
  templateUrl: './home-virtual.component.html',
  styleUrls: ['./home-virtual.component.scss']
})
export class HomeVirtualComponent implements OnInit {

  countDownDate;
  days; 
  hours;
  minutes;
  seconds;
  panelOpenState = false;
  panelOpenState2 = false;

  postAuthorEmail = 'jan.kanty.pawelski@gmail.com'

  comments = [
    {
      'id': 1,
      'author': {
        'name': 'Jan-Kanty Pawelski',
        'email': 'jan.kanty.pawelski@gmail.com',
        'website': 'pawelski.io',
        },
      'content': 'I made it! My awesome angular comment system. What do you think?',
      'loved': false
    },
    {
      'id': 2,
      'author': {
        'name': 'Tomasz Jakut',
        'email': 'comandeer@comandeer.pl',
        'website': 'comandeer.pl',
        },
      'content': 'Nice looking. Good job dude ;)',
      'loved': true,
    },
    {
      'id': 3,
      'author': {
        'name': 'Jan-Kanty Pawelski',
        'email': 'jan.kanty.pawelski@gmail.com',
        'website': 'pawelski.io',
        },
      'content': '<span class="reply">@Tomasz Jakut</span> Thanks man. I tried hard.',
      'loved': false,
    },
    {
      'id': 4,
      'author': {
        'name': 'Grzegorz Bąk',
        'email': 'szary.elf@gmail.com',
        'website': 'gregbal.com',
        },
      'content': 'Third! Amazing system man! By the way check my new website: <a href="//gregbak.com">http://gregbak.com</a>.',
      'loved': false,
    }
  ]

  newComment = {
      'id': 0,
      'author': {
        'name': '',
        'email': '',
        'website': '',
      },
      'content': '',
      'loved': false,
  }


  parseContent(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  };

  isAuthor(email) {
    return email === this.postAuthorEmail
  } 

  love (commentId){
    this.comments.forEach(comment => {
      if (comment.id == commentId)
        comment.loved = !comment.loved
    });      
  }

  reply(author) {
      if (!this.newComment.content)
      this.newComment.content = ''

      if (this.newComment.content.search('@' + author + '@') == -1) {
        if (this.newComment.content[0] == '@')
          this.newComment.content = ', ' + this.newComment.content
        else
          this.newComment.content = ' ' + this.newComment.content

         this.newComment.content = '@' + author + '@' + this.newComment.content
      }
  }

  addNewComment() {
      if( this.newComment.author.name.length > 0 && 
          this.newComment.author.email.length > 0 &&
          this.newComment.content.length > 0){

            this.newComment.id = this.comments.length + 1
    
            this.newComment.author.website = this.newComment.author.website.replace(/https?:\/\/(www.)?/, '')
    
            this.newComment.content = this.newComment.content.replace(/(@[^@.]+)@/, '<span class="reply">$1</span>')
            this.newComment.content = this.newComment.content.replace(/https?:\/\/(www.)?([a-zA-Z0-9\-_]+\.[a-zA-Z0-9]+)/, '<a href="//$2">$2</a>')
    
            this.newComment.loved = false
    
            this.comments.push( this.newComment);

        }



  }

      


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.countDownDate = new Date("Oct 29, 2020 00:00:00").getTime();

    setInterval(() => {

        var now = new Date().getTime();
      
        // Find the distance between now an the count down date
        let distance = this.countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // If the count down is over, write some text 
        /*if (distance < 0) {
          clearInterval(this.countdownfunction);
          document.getElementById("demo").innerHTML = "EXPIRED";
        }*/
      }, 1000);

  }

}
