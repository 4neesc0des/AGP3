import { APIResponse } from './../../models';
import { HttpService } from './../../services/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from 'src/app/models';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string = "";
  public games: Array<Game> = [];
  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  selectValue = [
    {
      title: "Name",
      value: "name"
    },
    {
      title: "Released",
      value: "released"
    },
    {
      title: "Added",
      value: "added"
    },
    {
      title: "Created",
      value: "created"
    },
    {
      title: "Updated",
      value: "updated"
    },
    {
      title: "Rating",
      value: "rating"
    },
    {
      title: "Metacritic",
      value: "metacritic"
    },
  ]
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.selectGames('metacrit', params['game-search']);
      } else {
        this.selectGames('metacrit');
      }
    })
  }

  selectGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(this.games);
      })
  }

  openGameDetails(id: string): void {
    console.log(id);

    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe()
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe()
    }
  }
}
